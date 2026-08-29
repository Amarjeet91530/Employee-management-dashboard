import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/employees';
const emptyEmployee = { name: '', email: '', phone: '', department: '', role: '', salary: '', status: 'Active' };

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyEmployee);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [message, setMessage] = useState('');

  const loadEmployees = async () => {
    try { const { data } = await axios.get(API); setEmployees(data); }
    catch { setMessage('Start the backend and connect MongoDB first.'); }
  };

  useEffect(() => { loadEmployees(); }, []);

  const departments = useMemo(() => ['All', ...new Set(employees.map(e => e.department).filter(Boolean))], [employees]);
  const filteredEmployees = employees.filter(e => {
    const text = `${e.name} ${e.email} ${e.role}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (department === 'All' || e.department === department);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) await axios.put(`${API}/${editingId}`, form);
      else await axios.post(API, { ...form, salary: Number(form.salary) || 0 });
      setForm(emptyEmployee); setEditingId(null); setMessage('Saved successfully.'); loadEmployees();
    } catch (error) { setMessage(error.response?.data?.message || 'Something went wrong.'); }
  };

  const editEmployee = (employee) => {
    setEditingId(employee._id);
    setForm({ name: employee.name, email: employee.email, phone: employee.phone, department: employee.department, role: employee.role, salary: employee.salary, status: employee.status });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    await axios.delete(`${API}/${id}`); loadEmployees();
  };

  const activeCount = employees.filter(e => e.status === 'Active').length;

  return <main className="page">
    <header className="header">
      <div><p className="eyebrow">EMPLOYEE PORTAL</p><h1>Employee Management</h1><p className="subtext">Manage your team from one simple dashboard.</p></div>
      <div className="stats"><div><strong>{employees.length}</strong><span>Total</span></div><div><strong>{activeCount}</strong><span>Active</span></div></div>
    </header>

    <section className="card form-card">
      <h2>{editingId ? 'Edit employee' : 'Add employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Full name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
        <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
        <input placeholder="Department" value={form.department} onChange={e => setForm({...form, department:e.target.value})} />
        <input placeholder="Role" value={form.role} onChange={e => setForm({...form, role:e.target.value})} />
        <input type="number" min="0" placeholder="Salary" value={form.salary} onChange={e => setForm({...form, salary:e.target.value})} />
        <select value={form.status} onChange={e => setForm({...form, status:e.target.value})}><option>Active</option><option>Inactive</option></select>
        <div className="actions"><button type="submit">{editingId ? 'Update employee' : 'Add employee'}</button>{editingId && <button type="button" className="secondary" onClick={() => {setEditingId(null);setForm(emptyEmployee)}}>Cancel</button>}</div>
      </form>
      {message && <p className="message">{message}</p>}
    </section>

    <section className="toolbar"><input placeholder="Search by name, email or role..." value={search} onChange={e => setSearch(e.target.value)} /><select value={department} onChange={e => setDepartment(e.target.value)}>{departments.map(d => <option key={d}>{d}</option>)}</select></section>

    <section className="card table-card"><div className="table-title"><h2>Employees</h2><span>{filteredEmployees.length} shown</span></div><div className="table-wrap"><table><thead><tr><th>Name</th><th>Contact</th><th>Department</th><th>Role</th><th>Salary</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredEmployees.map(e => <tr key={e._id}><td><strong>{e.name}</strong></td><td>{e.email}<br/><small>{e.phone}</small></td><td>{e.department || '-'}</td><td>{e.role || '-'}</td><td>₹{Number(e.salary || 0).toLocaleString('en-IN')}</td><td><span className={`status ${e.status.toLowerCase()}`}>{e.status}</span></td><td><button className="link" onClick={() => editEmployee(e)}>Edit</button><button className="link danger" onClick={() => deleteEmployee(e._id)}>Delete</button></td></tr>)}{filteredEmployees.length === 0 && <tr><td colSpan="7" className="empty">No employees found.</td></tr>}</tbody></table></div></section>
  </main>;
}

export default App;

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Employee {
    int id;
    string name;
    string department;
    double salary;
};

void showEmployees(const vector<Employee>& employees) {
    for (const auto& employee : employees) {
        cout << employee.id << " | " << employee.name << " | "
             << employee.department << " | " << employee.salary << endl;
    }
}

Employee* findEmployee(vector<Employee>& employees, int id) {
    for (auto& employee : employees) {
        if (employee.id == id) return &employee;
    }
    return nullptr;
}

int main() {
    vector<Employee> employees = {
        {101, "Rahul", "Engineering", 65000},
        {102, "Priya", "HR", 52000},
        {103, "Aman", "Finance", 58000}
    };

    cout << "Employee Management - C++ Demo\n\n";
    showEmployees(employees);

    auto* employee = findEmployee(employees, 102);
    if (employee) {
        employee->salary += 3000;
        cout << "\nUpdated salary for " << employee->name << ": " << employee->salary << endl;
    }

    return 0;
}

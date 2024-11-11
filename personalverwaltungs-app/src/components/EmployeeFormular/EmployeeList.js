import React, { useEffect, useState } from 'react';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(storedEmployees);
    }, []);

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
    };

    const renderEmployeeDetails = (employee) => {
        return (
            <div>
                <h3>Details für {employee.firstName} {employee.lastName}</h3>
                <p><strong>Abteilung:</strong> {employee.department}</p>
                <p><strong>E-Mail:</strong> {employee.email}</p>
                <p><strong>Telefonnummer:</strong> {employee.phone}</p>
                <p><strong>Geburtsdatum:</strong> {employee.birthday}</p>
                <p><strong>Eintrittsdatum:</strong> {employee.startDate}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Wochenstunden:</strong> {employee.weeklyHours}</p>
                <p><strong>Urlaubstage:</strong> {employee.vacationDays}</p>
                <p><strong>Gehalt:</strong> {employee.salary}</p>
                <p><strong>Bank:</strong> {employee.bank}</p>
                <p><strong>IBAN:</strong> {employee.iban}</p>
            </div>
        );
    };

    const handleDelete = (employeeId, e) => {
        e.stopPropagation();
        const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    };

    const handleEdit = (employeeId, e) => {
        e.stopPropagation();
        console.log("Bearbeiten: ", employeeId);
    };


    return (
        <div>
            <h2>Mitarbeiterliste</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                        {employee.firstName} {employee.lastName} - {employee.department}
                        <button onClick={(e) => handleEdit(employee.id, e)}>Bearbeiten</button>
                        <button onClick={(e) => handleDelete(employee.id, e)}>Löschen</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeList;

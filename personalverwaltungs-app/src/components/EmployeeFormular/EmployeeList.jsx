import React, { useEffect, useState } from 'react';
import EditEmployeeDetail from './EditEmployeeDetail';
import Abwesenheitskalender from '../Abwesenheitsplan/Abwesenheitsplan';
import EmployeeDocuments from '../Dokumente/Dokumente';
import "./EmployeeList.module.css";
import styles from "./EmployeeList.module.css";


function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDocuments, setShowDocuments] = useState(false);



    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(storedEmployees);
    }, []);

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setIsEditing(false);
        setShowCalendar(false);
        setShowDocuments(false);
    };

    const renderEmployeeDetails = (employee) => {
        if (showCalendar || showDocuments) return null;
        return (
            <div>
                <h3>Details für {employee.firstName} {employee.lastName}</h3>
                <p><strong>Abteilung:</strong> {employee.department}</p>
                <p><strong>E-Mail:</strong> {employee.email}</p>
                <p><strong>Telefonnummer:</strong> {employee.phone}</p>
                <p><strong>Geburtsdatum:</strong> {employee.birthday}</p>
                <p><strong>Eintrittsdatum:</strong> {employee.startDate}</p>
                <p><strong>Adresse:</strong> {employee.street}, {employee.city}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Wochenstunden:</strong> {employee.weeklyHours}</p>
                <p><strong>Urlaubstage:</strong> {employee.vacationDays}</p>
                <p><strong>Gehalt:</strong> {employee.salary}</p>
                <p><strong>Bank:</strong> {employee.bank}</p>
                <p><strong>IBAN:</strong> {employee.iban}</p>
                <p><strong>Steuer-ID:</strong> {employee.taxnumber}</p>
                <p><strong>Sozialversicherungsnummer:</strong> {employee.socialsecurity}</p>
                <p><strong>Krankenkasse:</strong> {employee.healthinsurance}</p>
                <button onClick={(e) => handleEdit(employee.id, e)}>Bearbeiten</button>
                <button onClick={(e) => handleDelete(employee, e)}>Mitarbeiter löschen</button>
                <button onClick={() => setShowCalendar(true)}>Abwesenheitsplanung ansehen</button>
                <button onClick={() => setShowDocuments(true)}>Dokumente verwalten</button>
                <button onClick={() => { setSelectedEmployee(null); setShowCalendar(false); }}>Zurück zur Liste</button>
            </div>
        );
    };

    

    const handleDelete = (employee, e) => {
        e.stopPropagation();

        const employeeName = `${employee.firstName} ${employee.lastName}`;

        const confirmed = window.confirm(`Sind Sie sicher, dass der Mitarbeiter ${employeeName} unwiderruflich aus dem System gelöscht werden soll?`);
        if (confirmed) {
        const updatedEmployees = employees.filter(employeeInList => employeeInList.id !== employee.id);
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        } else {
            console.log("Mitarbeiter wurde nicht gelöscht.")
        }
    };

    const handleEdit = (employeeId, e) => {
        const employeeToEdit = employees.find(emp => emp.id === employeeId);
        setSelectedEmployee(employeeToEdit);
        setIsEditing(true)
    };

    const handleSave = (updatedEmployee) => {
        const updatedEmployees = employees.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setSelectedEmployee(updatedEmployee);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedEmployee(selectedEmployee);
    };

    return (
        <div>
            {/* Mitarbeiterliste nur anzeigen, wenn weder Kalender noch Dokumente geöffnet sind */}
            {!showCalendar && !showDocuments && !isEditing && !selectedEmployee && <h2>Mitarbeiterliste</h2>}
            {!showCalendar && !showDocuments && !isEditing && !selectedEmployee && (
                <ul className={styles['employee-list']}>
                    {employees.map(employee => (
                        <li key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                            {employee.firstName} {employee.lastName} - {employee.department}
                        </li>
                    ))}
                </ul>
            )}
            
            {/* Mitarbeiter Detail Container wird nur angezeigt, wenn weder Kalender noch Dokumente angezeigt werden */}
            {!showCalendar && !showDocuments && selectedEmployee && (
                <div className={styles['employee-detail-container']}>
                    {!isEditing ? (
                        <div>
                            {renderEmployeeDetails(selectedEmployee)}
                        </div>
                    ) : (
                        <EditEmployeeDetail
                            employee={selectedEmployee}
                            onSave={handleSave}
                            onCancel={handleCancelEdit}
                        />
                    )}
                </div>
            )}

            {/* Kalender und Dokumente werden separat angezeigt */}
            {showCalendar && (
                <Abwesenheitskalender
                    employee={selectedEmployee}
                    onClose={() => setShowCalendar(false)}
                />
            )}
            {showDocuments && (
                <EmployeeDocuments
                    employeeId={selectedEmployee.id}
                    onClose={() => setShowDocuments(false)}
                />
            )}
        </div>
    );
}

export default EmployeeList;
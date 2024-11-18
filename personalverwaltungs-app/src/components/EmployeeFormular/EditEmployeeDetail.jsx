import React, { useEffect, useState } from "react";



function EditEmployeeDetail({ employee, onSave, onCancel}) {
    const [editedEmployee, setEditedEmployee] = useState(employee);

    useEffect(() => {
        setEditedEmployee(employee);
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedEmployee);
    };

    return (
        <div>
            <h3>Bearbeiten: {employee.firstName} {employee.lastName}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={editedEmployee.firstName} onChange={handleChange} placeholder="Vorname"/>
                <input type="text" name="lastName" value={editedEmployee.lastName} onChange={handleChange} placeholder="Nachname" />
                <input type="id" name="id" value={editedEmployee.id} onChange={handleChange} placeholder="Mitarbeiternummer" disabled/>
                <input type="email" name="email" value={editedEmployee.email} onChange={handleChange} placeholder="example@mail.com" />
                <input type="text" name="department" value={editedEmployee.department} onChange={handleChange} placeholder="Abteilung" />
                <input type="tel" name="phone" value={editedEmployee.phone} onChange={handleChange} placeholder="Telefonnummer" />
                <input type="text" name="street" value={editedEmployee.street} onChange={handleChange} placeholder="Straße/Hausnummer" />
                <input type="text" name="city" value={editedEmployee.city} onChange={handleChange} placeholder="PLZ/Ort" />
                <input type="date" name="birthday" value={editedEmployee.birthday} onChange={handleChange} placeholder="Geburtsdatum" />
                <label htmlFor="birthday">Geburtsdatum</label>
                <input type="date" name="startDate" value={editedEmployee.startDate} onChange={handleChange} placeholder="Eintrittsdatum" />
                <label htmlFor="startDate">Eintrittdatum</label>
                <input type="text" name="position" value={editedEmployee.position} onChange={handleChange} placeholder="Position" />
                <input type="number" name="weeklyHours" value={editedEmployee.weeklyHours} onChange={handleChange} placeholder="Wochenstunden" step={0.5} />
                <input type="number" name="vacationDays" value={editedEmployee.vacationDays} onChange={handleChange} placeholder="Urlaubstage" step={0.5} min={0} max={36} />
                <input type="number" name="salary" value={editedEmployee.salary} onChange={handleChange} placeholder="Gehalt" />
                <input type="text" name="bank" value={editedEmployee.bank} onChange={handleChange} placeholder="Bank" />
                <input type="text" name="iban" value={editedEmployee.iban} onChange={handleChange} placeholder="IBAN" max={34} pattern="[A-Z0-9]{15,34}$" />
                <input type="number" name="taxnumber" value={editedEmployee.taxnumber} onChange={handleChange} placeholder="Steuer-ID" />
                <input type="number" name="socialsecurity" value={editedEmployee.socialsecurity} onChange={handleChange} placeholder="Sozialversicherungsnummer" />
                <input type="text" name="healthinsurance" value={editedEmployee.healthinsurance} onChange={handleChange} placeholder="Krankenkasse" />
                <button type="submit">Änderungen speichern</button>
            </form>
            <button onClick={onCancel}>Abbrechen</button>
        </div>
    );
}

export default EditEmployeeDetail;
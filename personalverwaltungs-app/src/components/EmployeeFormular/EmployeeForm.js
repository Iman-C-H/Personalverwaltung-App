import React, { useState } from "react";
import { createEmployee } from "./EmployeeObject";

function EmployeeForm() {
    const [formData, setFormData] = useState(createEmployee());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Bitte eine gültige E-Mail-Adresse eingeben.");
            return;
        }
        
        const newEmployee = {
            ...formData,
            id: formData.id || `emp-${new Date().getTime()}`
        };
    

        const existingEmployees = JSON.parse(localStorage.getItem("employees")) || [];

        existingEmployees.push(newEmployee);

        localStorage.setItem("employees", JSON.stringify(existingEmployees));

        console.log("Neuer Mitarbeiter hinzugefügt:", newEmployee);

        setFormData(createEmployee());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="Vorname" />
            <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Nachname" />
            <input type="id" name="id" value={formData.id} onChange={handleChange} placeholder="Mitarbeiternummer" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" />
            <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Abteilung" />
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefonnummer" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" />
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} placeholder="Geburtsdatum" />
            <label htmlFor="birthday">Geburtsdatum</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Eintrittsdatum" />
            <label htmlFor="startDate">Eintrittdatum</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
            <input type="number" name="weeklyHours" value={formData.weeklyHours} onChange={handleChange} placeholder="Wochenstunden" />
            <input type="number" name="vacationDays" value={formData.vacationDays} onChange={handleChange} placeholder="Urlaubstage" />
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Gehalt" />
            <input type="text" name="bank" value={formData.bank} onChange={handleChange} placeholder="Bank" />
            <input type="iban" name="iban" value={formData.iban} onChange={handleChange} placeholder="IBAN" />
            <button type="submit">Mitarbeiter hinzufügen</button>
        </form>
    );
};

export default EmployeeForm;
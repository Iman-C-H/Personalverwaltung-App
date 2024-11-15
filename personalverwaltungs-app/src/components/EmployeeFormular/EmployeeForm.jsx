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
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefonnummer" />
            <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Straße/Hausnummer" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="PLZ/Ort" />
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} placeholder="Geburtsdatum" />
            <label htmlFor="birthday">Geburtsdatum</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Eintrittsdatum" />
            <label htmlFor="startDate">Eintrittdatum</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
            <input type="number" name="weeklyHours" value={formData.weeklyHours} onChange={handleChange} placeholder="Wochenstunden" step={0.5} />
            <input type="number" name="vacationDays" value={formData.vacationDays} onChange={handleChange} placeholder="Urlaubstage" step={0.5} min={0} max={36} />
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Gehalt" />
            <input type="text" name="bank" value={formData.bank} onChange={handleChange} placeholder="Bank" />
            <input type="text" name="iban" value={formData.iban} onChange={handleChange} placeholder="IBAN" max={34} pattern="[A-Z0-9]{15,34}$" />
            <input type="number" name="taxnumber" value={formData.taxnumber} onChange={handleChange} placeholder="Steuer-ID" />
            <input type="number" name="socialsecurity" value={formData.socialsecurity} onChange={handleChange} placeholder="Sozialversicherungsnummer" />
            <input type="text" name="healthinsurance" value={formData.healthinsurance} onChange={handleChange} placeholder="Krankenkasse" />
            <button type="submit">Mitarbeiter hinzufügen</button>
        </form>
    );
};

export default EmployeeForm;
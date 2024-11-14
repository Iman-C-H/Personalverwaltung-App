import React, { useState, useEffect } from 'react';

function EmployeeDocuments({ employeeId, onClose }) {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const savedDocuments = JSON.parse(localStorage.getItem(`documents-${employeeId}`)) || [];
        setDocuments(savedDocuments);
    }, [employeeId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            const newDocument = {
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type,
            };
            const updatedDocuments = [...documents, newDocument];
            setDocuments(updatedDocuments);
            localStorage.setItem(`documents-${employeeId}`, JSON.stringify(updatedDocuments));
            setFile(null);
            alert("Dokument hochgeladen!");
        } else {
            alert("Bitte ein Dokument auswählen.");
        }
    };

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        link.click();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dokumente für Mitarbeiter {employeeId}</h2>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Dokument hochladen</button>
            </div>
            <h3>Hochgeladene Dokumente:</h3>
            <ul>
                {documents.map((doc, index) => (
                    <li key={index}>
                        {doc.name} ({doc.type})
                        <button onClick={() => handleDownload(doc.url)}>Herunterladen</button>
                    </li>
                ))}
            </ul>
            <button onClick={onClose}>Zurück zu Mitarbeiterdetails</button>
        </div>
    );
}

export default EmployeeDocuments;

import React, { useState, useEffect } from 'react';

function AllgemeineDokumente({ onClose }) {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const savedDocuments = JSON.parse(localStorage.getItem(`general_documents`)) || [];
        setDocuments(savedDocuments);
    }, []);

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
            localStorage.setItem(`documents`, JSON.stringify(updatedDocuments));
            setFile(null);
            alert(`Dokument "${file.name}" erfolgreich hochgeladen!`);
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

    const handleDeleteDocument = (index) => {
        const documentToDelete = documents[index];
        const updatedDocuments = documents.filter((_, i) => !i  === index);
        setDocuments(updatedDocuments);
        localStorage.setItem(`general_documents`, JSON.stringify(updatedDocuments));
        alert(`Dokument "${documentToDelete.name}" wurde gelöscht!`);
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Wichtige Dokumente</h2>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Dokument hochladen</button>
            </div>
            <h3>Hochgeladene Dokumente:</h3>
            <ul>
                {documents.length === 0 ? (
                    <p>Es sind keine Dokumente vorhanden. Bitte laden Sie ein Dokument hoch.</p>
                ) : (
                    documents.map((doc, index) => (
                        <li key={index}>
                            {doc.name} ({doc.type})
                            <button onClick={() => handleDownload(doc.url)}>Herunterladen</button>
                            <button onClick={() => handleDeleteDocument(index)}>Dokument löschen</button>
                        </li>
                    ))
                )}
            </ul>
            <button onClick={onClose}>Zurück zur Startseite</button>
        </div>
    );
}

export default AllgemeineDokumente;
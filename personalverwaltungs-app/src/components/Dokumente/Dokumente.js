import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import "./Dokumente.css";

function EmployeeDocuments({ employeeId, onClose }) {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const savedDocuments =
      JSON.parse(localStorage.getItem(`documents-${employeeId}`)) || [];
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
      localStorage.setItem(
        `documents-${employeeId}`,
        JSON.stringify(updatedDocuments)
      );
      setFile(null);
      alert(`Dokument "${file.name}" erfolgreich hochgeladen!`);
    } else {
      alert("Bitte ein Dokument auswählen.");
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  const handleDeleteDocument = (index) => {
    const documentToDelete = documents[index];
    const updatedDocuments = documents.filter((_, i) => !i === index);
    setDocuments(updatedDocuments);
    localStorage.setItem(
      `documents-${employeeId}`,
      JSON.stringify(updatedDocuments)
    );
    alert(`Dokument "${documentToDelete.name}" wurde gelöscht!`);
  };

  return (
    <div className="document-container">
      <h2>Dokumente für Mitarbeiter {employeeId}</h2>
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Dokument hochladen</button>
      </div>
      <h3>Hochgeladene Dokumente:</h3>
      <ul>
        {documents.length === 0 ? (
          <p className="empty-state">
            Es sind keine Dokumente vorhanden. Bitte laden Sie ein Dokument
            hoch.
          </p>
        ) : (
          documents.map((doc, index) => (
            <li key={index}>
              {doc.name} ({doc.type})
              <div>
                <button onClick={() => handleDownload(doc.url)}>
                  Herunterladen
                </button>
                <button onClick={() => handleDeleteDocument(index)}>
                  Dokument löschen
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <button className="zuruck-button-dokumente" onClick={onClose} style={{ backgroundColor: '#003D4D'}}>Zurück zu Mitarbeiterdetails</button>
    </div>
  );
}

export default EmployeeDocuments;

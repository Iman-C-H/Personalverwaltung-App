import React, { useState, useEffect } from 'react';
import './AllgemeineDokumente.css';
import {BrowserRouter as Router, Link} from "react-router-dom";

const AllgemeineDokumente = ({ onClose }) => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const savedDocuments = JSON.parse(localStorage.getItem('general_documents')) || [];
    setDocuments(savedDocuments);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      
      const newDocument = {
        id: Date.now(),
        name: file.name,
        url: fileURL,
        type: file.type,
        uploadDate: new Date().toISOString(),
      };

      const updatedDocuments = [...documents, newDocument];
      setDocuments(updatedDocuments);
      localStorage.setItem('general_documents', JSON.stringify(updatedDocuments));
      setFile(null);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      alert(`Dokument "${file.name}" erfolgreich hochgeladen!`);
    } else {
      alert("Bitte ein Dokument auswählen.");
    }
  };

  const handleDownload = (doc) => {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteDocument = (index) => {
    const documentToDelete = documents[index];
    URL.revokeObjectURL(documentToDelete.url);
    
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
    localStorage.setItem('general_documents', JSON.stringify(updatedDocuments));
    alert(`Dokument "${documentToDelete.name}" wurde gelöscht!`);
  };

  return (
    <div className="document-container">
      <h2>Wichtige Dokumente</h2>
      
      <div className="file-upload">
        <input 
          type="file" 
          onChange={handleFileChange}
        />
        <button onClick={handleFileUpload}>
          Dokument hochladen
        </button>
      </div>

      <h3>Hochgeladene Dokumente:</h3>
      
      {documents.length === 0 ? (
        <div className="empty-state">
          Es sind keine Dokumente vorhanden. Bitte laden Sie ein Dokument hoch.
        </div>
      ) : (
        <ul>
          {documents.map((doc, index) => (
            <li key={doc.id || index}>
              <span>
                {doc.name} ({doc.type})
              </span>
              <div>
                <button onClick={() => handleDownload(doc)}>
                  Herunterladen
                </button>
                <button onClick={() => handleDeleteDocument(index)}>
                  Dokument löschen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <br></br>
      <Link to="/HR" className="back-button" onClick={onClose}>
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default AllgemeineDokumente;
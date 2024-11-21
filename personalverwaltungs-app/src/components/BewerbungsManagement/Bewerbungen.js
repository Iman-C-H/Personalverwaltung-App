import React, { useState } from 'react';
import "./Bewerbungen.css";

function BewerbungsVerwaltung() {
  // Initiale Dummy-Daten für Bewerbungen
  const [bewerbungen, setBewerbungen] = useState([
    {
      id: 1,
      name: "Max Mustermann",
      position: "Softwareentwickler",
      status: "Neu",
      bewerbungsDatum: "2024-11-21",
      kontaktEmail: "max.mustermann@example.com",
      herkunft: "Manuell",
      lebenslauf: null,
      detailsVisible: false,  // Flag für Sichtbarkeit der Details
    },
    {
      id: 2,
      name: "Anna Beispiel",
      position: "Projektmanagerin",
      status: "Interview",
      bewerbungsDatum: "2024-11-15",
      kontaktEmail: "anna.beispiel@example.com",
      herkunft: "Manuell",
      lebenslauf: null,
      detailsVisible: false,  // Flag für Sichtbarkeit der Details
    }
  ]);
  const [importLink, setImportLink] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // Drag & Drop Handler
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);  
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const importedBewerbung = {
          id: Date.now(),
          name: file.name.replace(/\.[^/.]+$/, ""),
          position: "Nicht spezifiziert",
          status: "Neu",
          bewerbungsDatum: new Date().toISOString().split("T")[0],
          kontaktEmail: "",
          herkunft: "Manuell",
          lebenslauf: event.target?.result,
          detailsVisible: false,  // Flag für Sichtbarkeit der Details
        };
        setBewerbungen((prev) => [...prev, importedBewerbung]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Import von Jobportalen (Dummy-Import)
  const importVonJobportal = () => {
    if (importLink.includes("linkedin.com")) {
      const neueBewerbung = {
        id: Date.now(),
        name: "LinkedIn Profil",
        position: "Nicht spezifiziert",
        status: "Neu",
        bewerbungsDatum: new Date().toISOString().split("T")[0],
        kontaktEmail: "",
        herkunft: "LinkedIn",
        detailsVisible: false,
      };
      setBewerbungen((prev) => [...prev, neueBewerbung]);
      setImportLink("");
    } else if (importLink.includes("indeed.com")) {
      const neueBewerbung = {
        id: Date.now(),
        name: "Indeed Bewerbung",
        position: "Nicht spezifiziert",
        status: "Neu",
        bewerbungsDatum: new Date().toISOString().split("T")[0],
        kontaktEmail: "",
        herkunft: "Indeed",
        detailsVisible: false,
      };
      setBewerbungen((prev) => [...prev, neueBewerbung]);
      setImportLink("");
    } else {
      alert("Unterstütztes Jobportal wurde nicht erkannt");
    }
  };

  // Status einer Bewerbung ändern
  const statusAendern = (id, neuerStatus) => {
    setBewerbungen((prev) =>
      prev.map((bewerbung) =>
        bewerbung.id === id ? { ...bewerbung, status: neuerStatus } : bewerbung
      )
    );
  };

  // Toggle-Details anzeigen
  const toggleDetails = (id) => {
    setBewerbungen((prev) =>
      prev.map((bewerbung) =>
        bewerbung.id === id
          ? { ...bewerbung, detailsVisible: !bewerbung.detailsVisible }
          : bewerbung
      )
    );
  };

  return (
    <div className="container py-4">
      {/* Import Card */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Bewerbungen Importieren</h5>
        </div>
        <div className="card-body">
          {/* Link Import */}
          <div className="mb-3 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Link zur Bewerbung (LinkedIn, Indeed)"
              value={importLink}
              onChange={(e) => setImportLink(e.target.value)}
            />
            <button className="btn btn-primary" onClick={importVonJobportal}>
              Importieren
            </button>
          </div>

          {/* Drag & Drop Bereich */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border p-4 text-center ${
              dragOver ? "bg-light border-primary" : "bg-white border-secondary"
            }`}
          >
            <p className="text-muted mb-2">
              Ziehen Sie den Lebenslauf hierher, um ihn hochzuladen.
            </p>
            <input type="file" accept=".pdf,.doc,.docx" className="d-none" />
          </div>
        </div>
      </div>

      {/* Bewerbungsliste */}
      <div className="card">
        <div className="card-header">
          <h5>Bewerbungen</h5>
        </div>
        <div className="card-body">
          {bewerbungen.length === 0 ? (
            <p className="text-muted">Keine Bewerbungen vorhanden.</p>
          ) : (
            bewerbungen.map((bewerbung) => (
              <div
                key={bewerbung.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <h6 className="mb-0">{bewerbung.name}</h6>
                  <small>{bewerbung.position}</small>
                  <div className="d-flex align-items-center mt-1">
                    <span className="badge bg-secondary me-2">
                      {bewerbung.herkunft}
                    </span>
                    <span
                      className={`badge ${
                        bewerbung.status === "Neu"
                          ? "bg-primary"
                          : bewerbung.status === "Interview"
                          ? "bg-warning"
                          : bewerbung.status === "Angenommen"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {bewerbung.status}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => statusAendern(bewerbung.id, "Interview")}
                  >
                    Zum Interview
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => toggleDetails(bewerbung.id)}
                  >
                    {bewerbung.detailsVisible ? "Details verstecken" : "Details anzeigen"}
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Details anzeigen */}
          {bewerbungen.map(
            (bewerbung) =>
              bewerbung.detailsVisible && (
                <div key={bewerbung.id} className="mt-3 p-3 border bg-light">
                  <h6>Details:</h6>
                  <p><strong>Email:</strong> {bewerbung.kontaktEmail}</p>
                  <p><strong>Bewerbungsdatum:</strong> {bewerbung.bewerbungsDatum}</p>
                  <p><strong>Lebenslauf:</strong> {bewerbung.lebenslauf ? "Vorhanden" : "Nicht hochgeladen"}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default BewerbungsVerwaltung;

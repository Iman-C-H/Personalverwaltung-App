import React, { useState } from "react";
import "./Bewerbungen.css";

function BewerbungsVerwaltung() {
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
      detailsVisible: false,
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
      detailsVisible: false,
    },
  ]);

  const [importLink, setImportLink] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Bewerbung löschen
  const deleteBewerbung = (id) => {
    setBewerbungen((prev) => prev.filter((bewerbung) => bewerbung.id !== id));
  };

  // Details ein-/ausblenden
  const toggleDetails = (id) => {
    setBewerbungen((prev) =>
      prev.map((bewerbung) =>
        bewerbung.id === id
          ? { ...bewerbung, detailsVisible: !bewerbung.detailsVisible }
          : bewerbung
      )
    );
  };

  // Funktion für den zyklischen Statuswechsel
  const statusToggle = (id) => {
    setBewerbungen((prev) =>
      prev.map((bewerbung) =>
        bewerbung.id === id
          ? {
              ...bewerbung,
              status:
                bewerbung.status === "Neu"
                  ? "Interview"
                  : bewerbung.status === "Interview"
                  ? "Angenommen"
                  : "Neu",
            }
          : bewerbung
      )
    );
  };

  // Bewerbungen von einem Jobportal importieren
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
      alert("Unterstütztes Jobportal wurde nicht erkannt.");
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Import-Bereich */}
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-header">
              <h5>Bewerbungen importieren</h5>
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
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const files = e.dataTransfer.files;
                  Array.from(files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const neueBewerbung = {
                        id: Date.now(),
                        name: file.name.replace(/\.[^/.]+$/, ""),
                        position: "Nicht spezifiziert",
                        status: "Neu",
                        bewerbungsDatum: new Date().toISOString().split("T")[0],
                        kontaktEmail: "",
                        herkunft: "Manuell",
                        lebenslauf: reader.result,
                        detailsVisible: false,
                      };
                      setBewerbungen((prev) => [...prev, neueBewerbung]);
                    };
                    reader.readAsDataURL(file);
                  });
                }}
                className={`border p-4 text-center ${
                  dragOver ? "bg-light border-primary" : "bg-white border-secondary"
                }`}
              >
                <p className="text-muted mb-2">
                  Ziehen Sie die Lebensläufe hierher, um sie hochzuladen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bewerbungsliste */}
        <div className="col-12">
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
                    className="bewerber-box position-relative border mb-3 p-3"
                  >
                    {/* Schließen-Button */}
                    <button
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                      onClick={() => deleteBewerbung(bewerbung.id)}
                      aria-label="Close"
                    ></button>

                    {/* Bewerbung-Details */}
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
                            : "bg-success"
                        }`}
                      >
                        {bewerbung.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => statusToggle(bewerbung.id)}
                      >
                        Status ändern
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => toggleDetails(bewerbung.id)}
                      >
                        {bewerbung.detailsVisible
                          ? "Details verstecken"
                          : "Details anzeigen"}
                      </button>
                    </div>

                    {/* Details anzeigen */}
                    {bewerbung.detailsVisible && (
                      <div className="mt-3 p-3 border bg-light">
                        <h6>Details:</h6>
                        <p>
                          <strong>Email:</strong> {bewerbung.kontaktEmail}
                        </p>
                        <p>
                          <strong>Bewerbungsdatum:</strong>{" "}
                          {bewerbung.bewerbungsDatum}
                        </p>
                        <p>
                          <strong>Lebenslauf:</strong>{" "}
                          {bewerbung.lebenslauf ? "Vorhanden" : "Nicht hochgeladen"}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BewerbungsVerwaltung;
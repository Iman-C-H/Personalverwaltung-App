import "./App.css";
import React from "react";

///// Hauptkomponente App /////
function App() {
  ///// Rendern der App /////
  return (
    <>
      {/* Hauptcontainer */}
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>
              <a href="HR" className="sbbuttonID">
                Techstarter HR
              </a>
            </li>{" "}
            <br></br>
            <br></br>
            <li>
              <a href="#1" className="sbbutton">
                Mitarbeiter
              </a>
            </li>
            <li>
              <a href="#2" className="sbbutton">
                Dokumente
              </a>
            </li>
            <li>
              <a href="#3" className="sbbutton">
                Urlaubs/<br></br>Abwesenheitsplan
              </a>
            </li>
            <li>
              <a href="#4" className="sbbutton">
                Offene Stellen
              </a>
            </li>
          </ul>

          <div className="main-content-flex">
            <button className="button">+</button>{" "}
            <h2>Mitarbeiter hinzufügen</h2>
          </div>
        </aside>

        {/* Logo-Bereich */}        
        <header className="animated-title">
          <h1>Willkommen!</h1>
        </header>
        <div className="logo-container, animated-logo">
          <img src="/Logosecond.png" alt="StaffBase" className="logo" />
        </div>

        <div>
          <img src="/Bild.svg" alt="Illustration" />
        </div>


        {/* Hauptinhalt */}
        {/* Hauptinhalt */}
      </div>

      {/* Footer außerhalb des Hauptcontainers */}
      <footer className="footer">
        <p>&copy; 2024 StaffBase. Alle Rechte vorbehalten.</p>
      </footer>
    </>
  );
}

///// Export der App-Komponente /////
export default App;

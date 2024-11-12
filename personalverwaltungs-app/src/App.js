import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <aside className="sidebar">
        <ul>
          <li><a href="1">Mitarbeiter</a></li>
          <li><a href="2">Dokumente</a></li>
          <li><a href="3">Urlaubs- und Abwesenheitsplan</a></li>
          <li><a href="4">Offene Stellen</a></li>
        </ul>
      </aside>

      <div className="main-content">
       
        <staffbase>
          <img src="/logofirst.png" alt="StaffBase" className="logo"/>
        </staffbase>
 <header className="animated">
          <h1>Willkommen</h1>
        </header>
        <main>
          <h3>Mit Staffbase lässt es sich managen.</h3>
          <button className="button">Personal hinzufügen</button>
        </main>
      </div>

      <footer className="footer">
        <p>&copy; 2024 StaffBase. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}

export default App;

import {BrowserRouter as Router, Link} from "react-router-dom"; /* Route, Routes,*/

function Sidebar({className}) {
  return (
    <aside className={`sidebar ${className}`}>
      <ul>
        <li>
          <a href="HR" className="sbbuttonID">
            Techstarter HR
          </a>
        </li>{" "}
        <br></br>
        <br></br>
        <li>
          <Link to="/staffpage" className="sbbutton">
            Mitarbeiter
          </Link>
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
        <button className="button">+</button> <h2>Mitarbeiter hinzufügen</h2>
      </div>
    </aside>
  );
}

export default Sidebar;

import {BrowserRouter as Router, Link} from "react-router-dom"; /* Route, Routes,*/
import "./Sidebar.module.css";


function SideBar() {
  return (

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
          <Link to="/mitarbeiterliste" className="sbbutton">
            Mitarbeiter
          </Link>
        </li>
        <li>
          <Link to="/dokumente" className="sbbutton">
            Dokumente
          </Link>
        </li>
        <li>
          <Link to="/eventplan" className="sbbutton">
            Urlaubs/<br></br>Abwesenheitsplan
          </Link>
        </li>
        <li>
          <a href="#4" className="sbbutton">
            Offene Stellen
          </a>
        </li>
      </ul>

      <div className="main-content-flex">
        <Link to="/mitarbeiter" className="button-link">
        <button className="button">+ Mitarbeiter hinzufügen</button></Link>
      </div>
    </aside>
  );
}

export default SideBar;

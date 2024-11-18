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
          <Link to="/mitarbeiter" className="sbbutton">
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
        <Link to="/mitarbeiter" className="button-link">
        <button className="button">+</button></Link> 
        <h2>Mitarbeiter hinzufügen</h2>
      </div>
    </aside>
  );
}

export default SideBar;

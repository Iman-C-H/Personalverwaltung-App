import {BrowserRouter as Router, Link} from "react-router-dom"; /* Route, Routes,*/
import "./Sidebar.css";

function SideBar() {
  return (

    <aside className="sidebar">
      <ul>  
      <div className="logo-container, animated-logo">
          <img src="/Logosecond.png" alt="StaffBase" className="logo" />
        </div>
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
          <Link to="/allgemeinedokumente" className="sbbutton">
            Dokumente
          </Link>
        </li>
        <li>
          <Link to="/eventplan" className="sbbutton">
            Eventplan
          </Link>
        </li>
        <li>
          <Link to="/bewerbungen" className="sbbutton">
            Bewerbungen
          </Link>
        </li>
      </ul>

      <div className="main-content-flex">
        <Link to="/mitarbeiter" className="button-link">
        <button className="button">+ Mitarbieter hinzufügen</button></Link> 
      </div>
    </aside>
  );
}

export default SideBar;

import React from "react";
import Button from 'react-bootstrap/Button';
import Sidebar from "../layout/sidebar/Sidebar";

function StaffPage() {
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
              HII

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
      </aside>
    </div>
  </>
);
}

export default StaffPage;


import { Router } from "react-router-dom";
import SideBar from "../sidebar/Sidebar.jsx";
import "./Homepage.module.css";

function HomePage() {
  return (

      <div>
        <header className="animated-title">
          <h1>Willkommen!</h1>
        </header>

        <div className="logo-container, animated-logo">
          <img src="/Logosecond.png" alt="StaffBase" className="logo" />
        </div>

        <div>
            <SideBar/>
        </div>

    </div>


  );
}

export default HomePage;

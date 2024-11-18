import { Router } from "react-router-dom";
import SideBar from "../sidebar/Sidebar.jsx";
import "./Homepage.css";

function HomePage() {
  return (

      <div>        
        <div className="logo-container, animated-logo">
          <img src="/Logosecond.png" alt="StaffBase" className="logo" />
        </div>


        <header className="animated-title">
          <h1>Willkommen!</h1>
        </header>


        
        <div>
            <SideBar/>
        </div>

    </div>


  );
}

export default HomePage;

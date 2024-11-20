import { Router } from "react-router-dom";
import SideBar from "../sidebar/Sidebar.jsx";
import "./Homepage.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (
      location.pathname.startsWith("/mitarbeiterliste") ||
      location.pathname.startsWith("/dokumente") ||
      location.pathname.startsWith("/eventplan")
    ) {
      setShowWelcome(false);  
    } else {
      setShowWelcome(true); 
    }
  }, [location]); 

  return (

      <div>
        {showWelcome && (        
        <div className="logo-container, animated-logo">
          <img src="/Logosecond.png" alt="StaffBase" className="logo" />
        </div>
        )}

        {showWelcome && (
        <header className="animated-title">
          <h1>Willkommen!</h1>
        </header>
        )}



        
        <div>
            <SideBar/>
        </div>

    </div>


  );
}

export default HomePage;

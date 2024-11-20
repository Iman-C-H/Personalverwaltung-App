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
        <header className="animated-title">
          <h1 style={{ fontSize: '100px' }}>Willkommen!</h1>

        </header>
        )}


        {showWelcome && (        
        <div className="logo-container, animated-logo" style={{ width:'100%', height:'500px'}}>
          <img src="/HRteam.png" alt="StaffBase" className="logo" style={{width:'100rem', height:'14rem',transform: 'scale(1.75)'}}/>
        </div>
        )}


        
        <div>
            <SideBar/>
        </div>

    </div>


  );
}

export default HomePage;

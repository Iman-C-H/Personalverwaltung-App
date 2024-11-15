import { Router } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

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
            <Sidebar className="animated-bar" />
        </div>

    </div>


  );
}

export default HomePage;

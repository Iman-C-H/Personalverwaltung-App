import { Router } from "react-router-dom";

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
          <img src="/Bild.svg" alt="Illustration" />
        </div>
      </div>

  );
}

export default HomePage;

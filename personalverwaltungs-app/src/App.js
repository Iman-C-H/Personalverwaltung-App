import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StaffPage from "./component/pages/StaffPage.js";
import Footer from "./component/layout/footer/Footer.jsx";
import Sidebar from "./component/layout/sidebar/Sidebar.jsx";
import HomePage from "./component/layout/content/HomePage.jsx";

///// Hauptkomponente App /////
function App() {
  ///// Rendern der App ///
  return (
    <Router>
      <div className="container">
        <HomePage />
        <Sidebar />
        <Routes>
          <Route path="/staffpage" Component={StaffPage}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

///// Export der App-Komponente /////
export default App;

// <Router>
//   {/* Hauptcontainer */}
//

//     {/* Sidebar */}

//     {/* ///definieren der Routen/// */}

//     <Routes>
//       <Route path="/staffpage" element={<StaffPage/>}></Route>
//     </Routes>

//   </div>

// </Router>

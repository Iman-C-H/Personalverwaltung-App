import "./App.css";
import React from "react";
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import Footer from "./component/layout/footer/Footer";
import Sidebar from "./component/layout/sidebar/Sidebar.jsx";
import HomePage from "./component/layout/content/HomePage.jsx";

///// Hauptkomponente App /////
function App() {
  ///// Rendern der App ///
  return (
    <Router>
      <div className="container">
        <HomePage/>
        <Sidebar />
        <Routes>
        </Routes>
        <Footer />
      </div>
    </Router>


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
  );
}

///// Export der App-Komponente /////
export default App;

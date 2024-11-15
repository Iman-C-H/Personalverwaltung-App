import "./App.css";
import React from "react";
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import Footer from "./component/layout/footer/Footer";
import SideBar from "./component/layout/sidebar/Sidebar.jsx";
import HomePage from "./component/layout/content/HomePage.jsx";
import EmployeeForm from "./components/EmployeeFormular/EmployeeForm.jsx";

///// Hauptkomponente App /////
function App() {
  ///// Rendern der App ///
  return (
    <Router>
      <div className="container">
        <HomePage/>
        <SideBar />
        <Routes>
          <Route path="/mitarbeiter" Component={EmployeeForm}> 
         </Route>
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}

///// Export der App-Komponente /////
export default App;

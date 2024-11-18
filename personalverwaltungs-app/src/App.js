import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Footer from "./component/layout/footer/Footer";
import SideBar from "./component/layout/sidebar/Sidebar.jsx";
import HomePage from "./component/layout/content/HomePage.jsx";
import EmployeeForm from "./components/EmployeeFormular/EmployeeForm.jsx";
import EmployeeList from "./components/EmployeeFormular/EmployeeList.jsx";
import Dokumente from "./components/Dokumente/Dokumente.js";
import Eventplan from "./components/Eventplan/Eventplan.js";

///// Hauptkomponente App /////
function App() {
  ///// Rendern der App ///
  return (
    <Router>
      <HomePage />
      <SideBar />
        <Routes>
          <Route path="/mitarbeiterliste" Component={EmployeeList}></Route>
          <Route path="/mitarbeiter" Component={EmployeeForm}></Route>
          <Route path="/dokumente" Component={Dokumente}></Route>
          <Route path="/eventplan" Component={Eventplan}></Route>
        </Routes>
        <Footer />
    </Router>
  );
}

///// Export der App-Komponente /////
export default App;

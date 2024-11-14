import './App.css';
import React from 'react';
//import EmployeeDocuments from './components/Dokumente/Dokumente';
import EmployeeList from './components/EmployeeFormular/EmployeeList';
import EmployeeForm from './components/EmployeeFormular/EmployeeForm';
//import Eventplan from './components/Eventplan/Eventplan';

function App() {
  return (
       <div className="App">
            <h1>Mitarbeiter hinzufügen</h1>
            <EmployeeForm/>
            <h1>Mitarbeiterliste</h1>
            <EmployeeList/>
            
        </div>
  );
}

export default App;

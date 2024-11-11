import './App.css';
import React from 'react';
import EmployeeList from './components/EmployeeFormular/EmployeeList';
import EmployeeForm from './components/EmployeeFormular/EmployeeForm';

function App() {
  return (
       <div className="App">
            <h1>Personalverwaltung</h1>
            <EmployeeForm />
            <EmployeeList />
        </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './main/crud-files/AddEmployee';
import Header from './main/Header';
import ErrorPage from './main/ErrorPage';
import UpdateEmployee from './main/crud-files/UpdateEmployee';
import EmployeeList from './main/crud-files/EmployeeList';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/Register" element={<AddEmployee/>}/>
        <Route path="/All" element={<EmployeeList/>}/>
        <Route path="/update-vehicle/:id" element={<UpdateEmployee/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

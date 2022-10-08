import axios from "axios";
import React, { useState } from "react";
import '../../css/main.css';

const AddEmployee = () => {

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailID: ""
  });

  const [error, setError] = useState("");

  const { firstName, lastName, emailID } = employee;

  const onInputChange = e => {
    setEmployee({...employee, [e.target.name]: e.target.value});
  }  

  //submit function
  const onSubmit = async e => {
    e.preventDefault();
    console.log(employee);
    await axios.post('http://localhost:8080/api/v1/employees/', employee).then((result) => {
      setError("");
      window.location = "/All";
    }).catch((e) => {
      setError(e.response.data);
    });
  }

  return (
    <div>
      {error !== "" && 
        <h3 className="error">
          {error}
        </h3>
      }
      <div className="center">
        <form onSubmit={ e => onSubmit(e) } className="form">

          <label className="label">Add Employee</label><br/>

          <input className="input" type="text" name="firstName" value={firstName} placeholder="Employee First Name" onChange={ e => onInputChange(e)}/><br/>
          <input className="input" type="text" name="lastName" value={lastName} placeholder="Employee Last Name" onChange={ e => onInputChange(e)}/><br/>
          <input className="input" type="text" name="emailID" value={emailID} placeholder="Employee Email ID" onChange={ e => onInputChange(e)}/><br/>
          
          <button className="button" type='submit'>Add Employee</button>

        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
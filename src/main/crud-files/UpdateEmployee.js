import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import '../../css/main.css';

const UpdateEmployee = () => {

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        emailID: ""
    });

    const { firstName, lastName, emailID } = employee;

    const onInputChange = e => {
    setEmployee({...employee, [e.target.name]: e.target.value});
    }  

    const [error, setError] = useState("");
    const { id } = useParams();   

    React.useEffect(() => {
        loadEmployees();
    }, []);
    
    //load specific Employee
    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/employees/" + id);
        setEmployee(result.data);
    };

    //update Employee data
    const onSubmit = async e => {
        e.preventDefault();
        await axios.put('http://localhost:8080/api/v1/employees/' + id, employee).then(() => {
        setError("");
        alert("Updated successfully...");
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
    
              <label className="label">Update Employee</label><br/>
    
              <input className="input" type="text" name="firstName" value={firstName} placeholder="Employee First Name" onChange={ e => onInputChange(e)}/><br/>
              <input className="input" type="text" name="lastName" value={lastName} placeholder="Employee Last Name" onChange={ e => onInputChange(e)}/><br/>
              <input className="input" type="text" name="emailID" value={emailID} placeholder="Employee Email ID" onChange={ e => onInputChange(e)}/><br/>
              
              <button className="button" type='submit'>Update Employee</button>
    
            </form>
          </div>
        </div>
      );
    };

export default UpdateEmployee;
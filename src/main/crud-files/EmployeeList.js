import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const columns = [
  
  { field: "id", headerName: "ID", width: 160 },
  { field: "firstName", headerName: "First Name", width: 160 },
  { field: "lastName", headerName: "Last Name", width: 160 },
  { field: "emailID", headerName: "Email", width: 300 },
  {
    field: "update",
    headerName: "Update Employee",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <div>
          <Link
            to={`/update-employee/${cellValues.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              Update
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    field: "delete",
    headerName: "Delete Employee",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              await axios
                .delete(
                  `http://localhost:8080/api/v1/employees/${cellValues.row.id}`
                )
                .then((res) => {
                  alert("Successfully Deleted..");
                  window.location = "/All";
                })
                .catch((err) => {
                  alert(err.message);
                });
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    axios.get("http://localhost:8080/api/v1/employees/").then((result) => {
      setEmployees(result.data);
    });
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default EmployeeList;

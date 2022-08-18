import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/profile/')
          .then((res) => {
            setUsers(res.data)
          })
          .catch((err) => {
            console.log(err);
            alert(err)
          })
  }, [])


  return (

    <div className="content-wrapper">
      {/* /.row */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users Table</h3>
              <div className="card-tools">
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              <table className="table text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Bmi</th>
                  </tr>
                </thead>
                <tbody>
                {
                  users.map((user)=>{
                      return(
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.user}</td>
                          <td>{user.age || "-"}</td>
                          <td>{user.gender|| "-"}</td>
                          <td>{user.phone|| "-"}</td>
                          <td>{user.weight|| "-"}</td>
                          <td>{user.height|| "-"}</td>
                          <td>{user.bmi|| "-"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
      </div>
      {/* /.row */}
    </div>
  );
}

export default Users;

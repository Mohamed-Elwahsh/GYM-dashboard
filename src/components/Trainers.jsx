import React, { useEffect, useState } from "react";
import axios from 'axios';


function Trainers() {
  const [trainers, setTrainers] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8000/api/trainers/")
      .then((res) => {
        setTrainers(res.data)
      })
      .catch((err) => console.log(err));
    }, []);
    
    return (
    <div className="content-wrapper">
      {/* /.row */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Trainers Table</h3>
              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 150 }}
                >
                </div>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap text-center">
                <thead >
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Experience (years)</th>
                    <th>Branch</th>
                    <th>Class</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  trainers.map((trainer) => {
                    return(
                      <tr key={trainer.id}>
                        <td>{trainer.id}</td>
                        <td>{trainer.name}</td>
                        <td>{trainer.age}</td>
                        <td>{trainer.gender}</td>
                        <td>{trainer.phone}</td>
                        <td>{trainer.experience}</td>
                        <td>{trainer.branch_id.name}</td>
                        <td>{trainer.class_id.name}</td>
                        <td>
                          <a className="btn btn-warning mx-2" href="">
                            Edit
                          </a>
                          <a className="btn btn-danger mx-2" href="">
                            Delete
                          </a>
                          <a className="btn btn-info mx-2" href="">
                            Show
                          </a>
                        </td>
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
      <div className="d-flex justify-content-center">
        <a className="btn btn-success w-50" href="">
          Add Trainer
        </a>
      </div>
    </div>
  );
}

export default Trainers;

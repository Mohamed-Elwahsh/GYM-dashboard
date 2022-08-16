import React, { useEffect, useState } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';

function Classes() {
  const [classes, setClasses] = useState([]);
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwNTk4OTU3LCJpYXQiOjE2NjA1OTU4NzksImp0aSI6IjkxYWUzODA2OGIzNTQzOTM5NGMzMDM4ZDI1YmI5OTBlIiwidXNlcl9pZCI6MX0.Ybe--IZBr9IV0L2adwJquVv9oKe8kExGwCuXbV6IvYg"
  // const token = "eyVOXrj4LBODkfptrLlaS-EtW0kdhy3tOYiGt_PdWnvY0"

  useEffect(() => {
    axios.get("http://localhost:8000/api/classes/")
      .then((res) => {
        setClasses(res.data)
      })
      .catch((err) => console.log(err));
    }, []);

    const deleteItem = (id) =>{
      axios.delete(`http://localhost:8000/api/events/modify/${id}`,   
                {headers: {
                      authorization:`Bearer ${token}`
                    }})
            .then((res) => {
              console.log(res);
              setClasses(
                classes.filter((cls) => {
                  return cls.id != id
                })
              )
            })
            .catch((err) => alert(err));
    }
    
    const deleteClass = (e, id) => {
      e.preventDefault();

      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to delete this item?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteItem(id)
          },
          {
            label: 'No',
          }
        ]
      });
    }

  return (
    <div className="content-wrapper">
      {/* /.row */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Classes Table</h3>
              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 150 }}
                >
                  <input
                    type="text"
                    name="table_search"
                    className="form-control float-right"
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-default">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    classes.map((cls) => {
                      return(
                    <tr key={cls.id}>
                      <td>{cls.id}</td>
                      <td>{cls.name}</td>
                      <td>{cls.price}</td>
                      <td>
                        <a className="btn btn-warning mx-2" href="">
                          Edit
                        </a>
                        <a className="btn btn-danger mx-2" href="" onClick={e => deleteClass(e, cls.id)}>
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
          Add Class
        </a>
      </div>
    </div>
  );
}

export default Classes;

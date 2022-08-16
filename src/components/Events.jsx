import React, { useEffect, useState } from "react";
import axios from 'axios';


function Events() {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8000/api/events/")
      .then((res) => {
        setEvents(res.data)
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
              <h3 className="card-title">Events Table</h3>
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
                    <th>Capacity(people)</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Price(EGP)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  events.map((event) => {
                    return (
                      <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.name}</td>
                        <td>{event.capacity}</td>
                        <td>{event.start_date.substring(0, 10)}</td>
                        <td>{event.end_date.substring(0, 10)}</td>
                        <td>{event.price}</td>
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
          Add Event
        </a>
      </div>
    </div>
  );
}

export default Events;

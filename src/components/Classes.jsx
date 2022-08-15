import React from "react";

function Classes() {
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
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Yoga</td>
                    <td>
                      Bacon ipsum dolor sit amet salami venison chicken flank
                      fatback doner.
                    </td>
                    <td>
                      <span className="tag tag-success">50$</span>
                    </td>
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

import React from "react";

function CreateBranch() {
  return (
    <div className="content-wrapper">
      {/* general form elements */}
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Create Branch</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form>
          <div className="card-body">
            <div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* /.card */}
    </div>
  );
}

export default CreateBranch;

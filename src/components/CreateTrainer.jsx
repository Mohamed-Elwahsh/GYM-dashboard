import React from "react";

function CreateTrainer() {
  return (
    <div className="content-wrapper">
      {/* general form elements */}
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Create Trainer</h3>
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
                <label className="form-label">Age</label>
                <input type="text" className="form-control" placeholder="Age" />
              </div>
              <div className="mb-3">
                <select className="form-select">
                  <option selected>Gender</option>
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Experience"
                />
              </div>
              <div className="mb-3">
                <select className="form-select">
                  <option selected>Branches</option>
                  <option value={1}>Menofia</option>
                </select>
              </div>
              <div className="mb-3">
                <select className="form-select">
                  <option selected>Class</option>
                  <option value={1}>Yoga</option>
                </select>
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

export default CreateTrainer;

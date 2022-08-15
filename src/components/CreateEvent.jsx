import React from "react";

function CreateEvent() {
  return (
    <div className="content-wrapper">
      {/* general form elements */}
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Create Event</h3>
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
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} defaultValue={""} />
              </div>
              <div className="mb-3">
                <label className="form-label">Photo</label>
                <input type="file" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacity</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Capacity"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Start date</label>
                <input
                  type="date"
                  className="form-control"
                  value="2022-08-01"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End date</label>
                <input
                  type="date"
                  className="form-control"
                  value="2023-08-01"
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

export default CreateEvent;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';



function Branches() {

  const [branches, setBranches] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editBranch, setEditBranch] = useState(
    {id:'', name: '', address: '', phone: ''}
  );
  const [newBranch, setNewBranch] = useState({
    name:"",
    address:"",
    phone:""
  })

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwNjczNTY0LCJpYXQiOjE2NjA2NTYwNTgsImp0aSI6IjJjOWVkMGZkOWMxMjRiNDRiODQwMGZjZDU0YTcyY2UzIiwidXNlcl9pZCI6MX0.Ci7SsxBxAm54hrM_XRg2qvkqY1vXKzNUrpLFEgYLqyY"
  // const token = "eyVOXrj4LBODkfptrLlaS-EtW0kdhy3tOYiGt_PdWnvY0"

  useEffect(() => {
    axios.get("http://localhost:8000/api/branch/")
      .then((res) => {
        setBranches(res.data)
      })
      .catch((err) => console.log(err));
    }, []);

  const deleteItem = (id) =>{
    axios.delete(`http://localhost:8000/api/branch/delete/${id}`,   
              {headers: {
                    authorization:`Bearer ${token}`
                  }})
          .then((res) => {
            
            setBranches(
              branches.filter((branch) => {
                return branch.id != id
              })
            )
          })
          .catch((err) => alert(err));
  }
  
  const deleteBranch = (e, id) => {
    e.preventDefault();
    
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this Branch?',
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
  const getNewBranchName = (e) =>{
    setNewBranch({
      ...newBranch,
      name: e.target.value,
    });
  }

  const getNewBranchAddress = (e) =>{
    setNewBranch({
      ...newBranch,
      address: e.target.value,
    });
  }

  const getNewBranchPhone = (e) =>{
    setNewBranch({
      ...newBranch,
      phone: e.target.value,
    });
  }

  const handelSubmit = (e) =>{
    e.preventDefault();
    let errors = {}
    if (!newBranch.name){
      errors.name = "Name can not be empty."
    }
    if (!newBranch.address){
      errors.address = "Address can not be empty."
    }
    if (!newBranch.phone){
      errors.phone = "Phone can not be empty."
    }
    setNewBranch({
      ...newBranch,
      errors,
    })
    
    if (!Object.keys(errors).length){
      axios.post('http://localhost:8000/api/branch/create/',
            newBranch,
            {headers: {
              authorization:`Bearer ${token}`
            }})
            .then((res) => {
              var newID = branches.slice(-1)[0].id
             
              setNewBranch({
                ...newBranch,
                id: newID+1,
              });
              setBranches(
                [...branches, newBranch]
              );
              setCreateModal(false)
            })
          .catch((err)=>{
            console.log(err);
            alert(err.response.data.detail)
          })

    }
  } 

  const renderCreateModal = () => {
    return (
      
      <div className="mx-auto w-75 mt-5">
          <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Create Branch</h3>
            <button className="btn btn-danger" onClick={() => setCreateModal(false)}>X</button>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={handelSubmit}>
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={getNewBranchName}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    onChange={getNewBranchAddress}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    onChange={getNewBranchPhone}
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
          </div>
    )
  }

  const activateEditModal = (e, branch) => {
    e.preventDefault();
    setEditModal(true);
    setEditBranch(branch);
  }

  const closeEditForm = (e) => {
    e.preventDefault();
    setEditModal(false);
    setEditBranch({
      name:"",
      address:"",
      phone:""
    })
  }

  const getEditBranchName = (e) =>{
    setEditBranch({
      ...editBranch,
      name: e.target.value,
    });
  }

  const getEditBranchAddress = (e) =>{
    setEditBranch({
      ...editBranch,
      address: e.target.value,
    });
  }

  const getEditBranchPhone = (e) =>{
    setEditBranch({
      ...editBranch,
      phone: e.target.value,
    });
  }
  const handelEditBranch = (e) => {
    e.preventDefault();
    let errors = {}
    if (!editBranch.name){
      errors.name = "Name can not be empty."
    }
    if (!editBranch.address){
      errors.address = "Address can not be empty."
    }
    if (!editBranch.phone){
      errors.phone = "Phone can not be empty."
    }
    setEditBranch({
      ...editBranch,
      errors,
    })

    if (!Object.keys(errors).length){
  
      axios.put(`http://localhost:8000/api/branch/update/${editBranch.id}/`,
            editBranch,
            {headers: {
              authorization:`Bearer ${token}`
            }})
            .then((res) => {
              
              const newbranches = branches.filter((branch) => {
                  return branch.id != editBranch.id
                })
              
              setBranches(
                [...newbranches, editBranch]
              )
              setEditModal(false)
            })
            
          .catch((err)=>{
            console.log(err);
            alert(err.response.data.detail)
          })

    }
  }
  const EditModalForm = () => {
    return (
      <div className="mx-auto w-75 mt-5">
          <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Edit Branch</h3>
            <button className="btn btn-danger" onClick={closeEditForm}>X</button>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={handelEditBranch}>
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={editBranch.name}
                    onChange={getEditBranchName}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={editBranch.address}
                    onChange={getEditBranchAddress}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={editBranch.phone}
                    onChange={getEditBranchPhone}
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
          </div>
    )
  }

  return (
    <div className="content-wrapper">
      {/* /.row */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Branches Table</h3>
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

              <table className="table text-nowrap text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                        <tbody>
                        {
                    branches.map((branch)=>{
                      return(
                        <tr key={branch.id}>
                          <td>{branch.id}</td>
                          <td>{branch.name}</td>
                          <td>{branch.address}</td>
                          <td>{branch.phone}</td>
                          <td>
                            
                            <a className="btn btn-warning mx-2" href="" onClick={e => activateEditModal(e, branch)}>
                              Edit
                            </a>
                            <a className="btn btn-danger mx-2" href="" onClick={e => deleteBranch(e, branch.id)}>
                              Delete
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
          <button className="btn btn-success mx-2 w-50" onClick={() => setCreateModal(true)}>Add Branch</button>
      </div>  
          {createModal && renderCreateModal()}
          {editModal && EditModalForm()}
      </div>
  );
}

export default Branches;

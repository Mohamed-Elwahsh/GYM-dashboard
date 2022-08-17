import React, { useEffect, useState } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';

function Classes() {
  const [classes, setClasses] = useState([]);
  const [singleClass, setSingleClass] = useState({});
  const [CreateClass, setCreateClass] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [classCard, setClassCard] = useState(false)
  const [newClass, setNewClass] = useState({
    name : "",
    description : "",
    phone : ""
  })
  const [editClass, setEditClass] = useState({
    id:'', 
    name: '', 
    description: '', 
    price: ''
  })

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwNjgxMzg2LCJpYXQiOjE2NjA2NTYwNTgsImp0aSI6ImRmYjUyMTFlNTBlNTQxNDhhYzRkYWMzZDgzZWQ4MmMyIiwidXNlcl9pZCI6MX0.nTGFrTBk169sv71R5sQ0H0pHHRTRsFPe5HHQ5UctOcY"
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

    const activateCreateClass = () => {
        setCreateClass(true)
        setEditForm(false)
        setClassCard(false)
    }

    const getNewClassName = (e) => {
      setNewClass({
        ...newClass,
        name: e.target.value
      })
    }

    const getNewClassDescription = (e) => {
      setNewClass({
        ...newClass,
        description: e.target.value
      })
    }
    const getNewClassPrice = (e) => {
      setNewClass({
        ...newClass,
        price: e.target.value
      })
    }

    const CreateNewClass = (e) =>{
      e.preventDefault();
      let errors = {}
      if (!newClass.name){
        errors.name = "Name can not be empty."
      }
      if (!newClass.description){
        errors.description = "Description can not be empty."
      }
      if (!newClass.price){
        errors.price = "Phone can not be empty."
      }
      setNewClass({
        ...newClass,
        errors,
      })
      console.log(errors);
      if (!Object.keys(errors).length){
        axios.post('http://localhost:8000/api/classes/',
              newClass,
              {headers: {
                authorization:`Bearer ${token}`
              }})
              .then((res) => {
                var newID = classes.slice(-1)[0].id
              
                setNewClass({
                  ...newClass,
                  id: newID+1,
                });
                setClasses(
                  [...classes, newClass]
                );
                setCreateClass(false)
              })
            .catch((err)=>{
              console.log(err);
              alert(err.response.data.detail)
            })
        }
    }
    const CreateClassForm = () => {
      return (
        <div className="mx-auto w-75 mt-5">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header text-right">
              <h3 className="card-title">Create Class</h3>
              <button className="btn btn-danger" onClick={() => setCreateClass(false)}>X</button>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={CreateNewClass}>
              <div className="card-body">
                <div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      onChange={getNewClassName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" placeholder="Description" onChange={getNewClassDescription} rows={3} defaultValue={""} />
                   
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      onChange={getNewClassPrice}
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


    const activateEditModal = (e, cls) => {
      e.preventDefault();
      setEditForm(true);
      setCreateClass(false)
      setClassCard(false)
      setEditClass(cls);
    }

    const closeEditForm = (e) => {
      e.preventDefault();
      setEditForm(false);
      setEditClass({
        name:"",
        description:"",
        price:""
      })
    }

    const getEditClassName = (e) => {
      setEditClass({
        ...editClass,
        name: e.target.value
      })
    }

    const getEditClassDescription = (e) => {
      setEditClass({
        ...editClass,
        description: e.target.value
      })
    }
    const getEditClassPrice = (e) => {
      setEditClass({
        ...editClass,
        price: e.target.value
      })
    }

    const handelEditClass = (e) => {
      e.preventDefault();
      let errors = {}
      if (!editClass.name){
        errors.name = "Name can not be empty."
      }
      if (!editClass.description){
        errors.description = "Description can not be empty."
      }
      if (!editClass.price){
        errors.price = "Phone can not be empty."
      }
      setNewClass({
        ...editClass,
        errors,
      })
      console.log(errors);
      if (!Object.keys(errors).length){
        axios.put(`http://localhost:8000/api/classes/${editClass.id}/`,
              editClass,
              {headers: {
                authorization:`Bearer ${token}`
              }})
              .then((res) => {
                
                const newClasses = classes.filter((cls) => {
                  return cls.id != editClass.id
                })
              
              setClasses(
                [...newClasses, editClass]
              )
                setEditForm(false)
              })
            .catch((err)=>{
              console.log(err);
              alert(err.response.data.detail)
            })
        }
    }

    const EditClassForm = () => {
      return (
        <div className="mx-auto w-75 mt-5">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header text-right">
              <h3 className="card-title">Create Class</h3>
              <button className="btn btn-danger" onClick={closeEditForm}>X</button>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={handelEditClass}>
              <div className="card-body">
                <div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value = {editClass.name}
                      onChange={getEditClassName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" placeholder="Description" value = {editClass.description} onChange={getEditClassDescription} rows={3}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      value={editClass.price}
                      onChange={getEditClassPrice}
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
    const closeClassCard = () =>{
      setClassCard(false)
    }

    const activateClassCard = (e, id) =>{
      setClassCard(true)
      setEditForm(false);
      setCreateClass(false)
      retrieveClassInfo(id)
    }

    const retrieveClassInfo = (id) => {
      axios.get(`http://localhost:8000/api/classes/${id}/`)
      .then((res) => {
        setSingleClass(res.data)
      })
      .catch((err) => console.log(err))
    }
    const singleClassCard = () => {
      return(
        <div className="mx-auto w-75 mt-5">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header text-right">
              <h3 className="card-title">{singleClass.name} Class</h3>
              <button className="btn btn-danger" onClick={closeClassCard}>X</button>
            </div>
            <div className="card-body">
                <div>
                  <div className="mb-5">
                      <p><strong>Class Name:    </strong><span className="mx-5">{singleClass.name}</span></p>
                  </div>
                  <div className="mb-5">
                      <p><strong>Class Description:</strong></p>
                      <p className="mx-5">{singleClass.description}</p>
                  </div>
                  <div className="mb-5">
                  <p><strong>Class Price:    </strong><span className="mx-5">{singleClass.price} EGP</span></p>
                  </div>
                  <div className="mb-5">
                  <p><strong>Created at:    </strong><span className="mx-5">{singleClass.created.substr(0,10)}</span></p>
                  </div>
                  </div>
                  <button className="btn btn-danger" onClick={closeClassCard}>Close</button>
                  </div>
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
              <table className="table text-nowrap text-center">
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
                        <a className="btn btn-warning mx-2" onClick={e => activateEditModal(e, cls)}>
                          Edit
                        </a>
                        <a className="btn btn-danger mx-2" href="" onClick={e => deleteClass(e, cls.id)}>
                          Delete
                        </a>
                        <a className="btn btn-info mx-2" onClick={e => activateClassCard(e, cls.id)}>
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
        <a className="btn btn-success w-50" onClick={activateCreateClass}>
          Add Class
        </a>
      </div>
      {CreateClass && CreateClassForm()}
      {editForm && EditClassForm()}
      {classCard && singleClassCard()}
    </div>
  );
}

export default Classes;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({})
  const [trianerCard, setTrainertCard] = useState(false)


  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwNjUyNzA1LCJpYXQiOjE2NjA2NTI0MDUsImp0aSI6IjcwNWJkZWMwZDMyYzQwMzFiMWJjNDI0MDY2MDRmMGRjIiwidXNlcl9pZCI6MX0.e_BjUylQPpWB7fTKKgFJVVWAgjAIFWQZaIiKR4ItJF4"
  // const token = "eyVOXrj4LBODkfptrLlaS-EtW0kdhy3tOYiGt_PdWnvY0"

  useEffect(() => {
    axios.get("http://localhost:8000/api/trainers/")
      .then((res) => {
        setTrainers(res.data)
      })
      .catch((err) => console.log(err));
    }, []);
    
    const deleteItem = (id) =>{
      axios.delete(`http://localhost:8000/api/trainers/delete/${id}`,   
                {headers: {
                      authorization:`Bearer ${token}`
                    }})
            .then((res) => {
              
              setTrainers(
                trainers.filter((trainer) => {
                  return trainer.id != id
                })
              )
            })
            .catch((err) => alert(err));
    }
    const deleteTrainer = (e, id) => {
      e.preventDefault();

      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to delete this item?.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteItem(id)
          },
          {
            label: 'No',
            //onClick: () => alert('Click No')
          }
        ]
      });
    }



    const closeTrainerCard = () =>{
      setTrainertCard(false)
    }

    const activateTrainerCard = (e, trainer) =>{
      setTrainertCard(true)
      setTrainer(trainer)
    }

//     age
// branch_id: {id: 4, created: '2022-08-15T22:56:10.276398Z', modified: '2022-08-15T22:56:10.276427Z', name: 'Smouha Branch', address: 'Smouha', …}
// class_id:
// name: "fitness"
// experience: 3
// gender: "male"
// id: 4
// name: "Mahmoud Saeed"
// phone: "01155217475
    console.log(trainer);

    const singleTrainerCard = () => {
      return(
        <div className="mx-auto w-75 mt-5">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header text-right">
              <h3 className="card-title">{trainer.name}</h3>
              <button className="btn btn-danger" onClick={closeTrainerCard}>X</button>
            </div>
            <div className="card-body">
                <div>
                  <div className="my-4">
                    <img src={trainer.image} className="mt-5 mx-5"height="350" width="700" />
                </div>

                  <div className="mb-2">
                      <p><strong>Trainer Name:    </strong><span className="mx-5">{trainer.name}</span></p>
                  </div>
                  <div className="mb-2">
                      <p><strong>Trainer Age:    </strong><span className="mx-5">{trainer.age}</span></p>
                  </div>
                  <div className="mb-2">
                      <p><strong>Trainer Experience:    </strong><span className="mx-5">{trainer.experience} years</span></p>
                  </div>
                  <div className="mb-2">
                      <p><strong>Trainer Gender:    </strong><span className="mx-5">{trainer.gender}</span></p>
                  </div>
                  <div className="mb-2">
                      <p><strong>Trainer Phone:    </strong><span className="mx-5">{trainer.phone}</span></p>
                  </div>
                  <div className="mb-2">
                      <p><strong>Trainer Branch:    </strong><span className="mx-5">{trainer.branch_id.name}</span></p>
                  </div>
                  <div className="mb-2">
                      <p><strong>Trainer Class:    </strong><span className="mx-5">{trainer.class_id.name}</span></p>
                  </div>
                </div>
            <button className="btn btn-danger" onClick={closeTrainerCard}>Close</button>
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
              <table className="table text-nowrap text-center">
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
                          <a className="btn btn-danger mx-2" onClick={e => deleteTrainer(e, trainer.id)}>
                            Delete
                          </a>
                          <a className="btn btn-info mx-2" onClick={e => activateTrainerCard(e, trainer)}>
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
      {trianerCard && singleTrainerCard()}
    </div>
  );
}

export default Trainers;

import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faEye,faPen,faTrash } from '@fortawesome/free-solid-svg-icons';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

function Home() {
  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);

const {udata,setUdata } = useContext(adddata);

  const getdata = async (e) => {
    const res = await fetch("http://localhost:8000/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json"
      }
    });
    const data = await res.json();
    console.log(data);

    if (data.status === 404 || !data) {
      console.log("error");
    } else {
      setuserdata(data);
      console.log("data get successfully");
    }
  }
  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8000/deleteuser/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 404 || !data2) {
      alert("error")
    } else {
      alert("user deleted");
      getdata();
    }

  }

  return (
    <>
      {
        udata ?
          <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success!</strong> User added successfully
              <button type="button" class="close" data-dismiss="success" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> 
          </> : ""

    }


      <div className="mt-2">
        <div className='container'>
          <div className='add_btn'>
            <NavLink to="/register" className='btn btn-primary mb-2'>Add Data</NavLink>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr className='table-dark'>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Job</th>
                <th>Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                getuserdata.map((element, id, key = "userdata") => {
                  return (
                    <>
                      <tr>
                        <th>{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.work}</td>
                        <td>{element.mobile}</td>
                        <td className='d-flex justify-content-between'>
                          <NavLink to={`/view/${element._id}`}>  <button className='btn btn-primary'><RemoveRedEyeIcon /></button> </NavLink>
                          <NavLink to={`/edit/${element._id}`}>  <button className='btn btn-success'><EditIcon /></button> </NavLink>
                          <NavLink>  <button className='btn btn-danger' onClick={() => { deleteuser(element._id) }}><DeleteIcon /></button> </NavLink>
                        </td>
                      </tr>
                    </>
                  )
                }
                )}

            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Home

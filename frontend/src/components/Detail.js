import React from 'react'
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/esm/CardImg';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Navigate, NavLink, useNavigate, useParams} from 'react-router-dom';
import  {useState,useEffect} from 'react';


function Detail() {
  const {id} = useParams("");
  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);
  const navigate = useNavigate("");
  const getindividualdata = async (e) => {
    const res = await fetch(`http://localhost:8000/getuser/${id}`, {
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
    getindividualdata();
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
      navigate('/');
    }
  }

  return (
    <div className='mt-3'>
      <div className='container'>
        <h2>Welcome {getuserdata.name}</h2>
        <Card style={{ maxWidth: 600 }}>
          <Card.Body>
            <div className='add_btn'>
             <NavLink to={`/edit/${getuserdata._id}`}><button className='btn btn-success mx-2'><EditIcon /></button></NavLink> 
              <button className='btn btn-danger'  onClick={() => { deleteuser(getuserdata._id) }}><DeleteIcon /></button>
            </div>
            <div className='row'>
              <div className='left_view col-lg-6  col-md-6 col-12'>
                <AccountCircleIcon style={{width:"100px"}} />
                {/* <CardImg src='../components/images/profile.png'></CardImg> */}
                <h3 className='mt-3'>Name: <span>{getuserdata.name}</span></h3>
                <p className='mt-3'>Age: <span>{getuserdata.age}</span></p>
                <p className='mt-3'><EmailIcon /> Email: <span>{getuserdata.email}</span></p>
                <p className='mt-3'><WorkIcon /> Occupation: <span>{getuserdata.work}</span></p>
              </div>
              <div className='right_view col-lg-6  col-md-6 col-12'>
                <p className='mt-5'><SmartphoneIcon /> Mobile: <span>{getuserdata.mobile}</span></p>
                <p className='mt-4'><LocationOnIcon /> Location: <span>{getuserdata.add}</span></p>
                <p className='mt-4'>Description: <span>{getuserdata.desc}</span></p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

    </div>
  )
}

export default Detail
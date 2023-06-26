import React,{useState,useEffect} from 'react'
import {json, NavLink, useParams, useNavigate} from 'react-router-dom'

function Edit() {
    const navigate = useNavigate("");
    const[inputValue,setInputValue]= useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        add:"",
        desc:""
    });
const {id} = useParams("");
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
          setInputValue(data);
          console.log("data get successfully");
        }
      }
      useEffect(() => {
        getindividualdata();
      }, []);

    const formHandler = (e)=>{
     console.log(e.target.value);
     const {name,value} = e.target;
  setInputValue((prevValue)=>{
    return{
        ...prevValue,
        [name]:value
    }
  })
}

const updatedata = async(e)=>{
e.preventDefault();
const {name, email, age, mobile, work, add, desc} = inputValue;
const res2 = await fetch(`http://localhost:8000/updatedata/${id}`,{
    method:"PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name, email, age, mobile, work, add, desc
    })
}); 

const data2 = await res2.json();
console.log(data2);

if (res2.status === 404 || !data2) {
    alert("fill the data");
}else{
    alert("data update ");
    navigate('/');
}

}
  return (
    <div className='container'>

    <form className='mt-5'>
        <div className='row'>
            <div className='mb-3 col-lg-6 col-md-6 col-12'>
                <label for="exampleInputEmail1">Name</label>
                <input type="text" name='name' onChange={formHandler} value={inputValue.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
            </div>
            <div className='mb-3 col-lg-6 col-md-6 col-12'>
                <label for="exampleInputPassword1">Email</label>
                <input type="email" name='email' onChange={formHandler} value={inputValue.email} className="form-control" id="exampleInputPassword1" placeholder="Enter Email" />
            </div>
            <div className='mb-3 col-lg-6 col-md-6 col-12'>
                <label for="exampleInputPassword1">Age</label>
                <input type="number" name='age' onChange={formHandler} value={inputValue.age} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className='mb-3 col-lg-6 col-md-6 col-12'>
                <label for="exampleInputPassword1">Mobile</label>
                <input type="number" name='mobile'onChange={formHandler} value={inputValue.mobile} className="form-control" id="exampleInputPassword1" placeholder="Mobile" />
            </div>
            <div className='mb-3 col-lg-6 col-md-6 col-12'>
                <label for="exampleInputPassword1">Work</label>
                <input type="text" name='work' onChange={formHandler} value={inputValue.work} className="form-control" id="exampleInputPassword1" placeholder="Work" />
            </div>
            <div className='mb-3 col-lg-6 col-md-6 col-12'>
                <label for="exampleInputPassword1">Address</label>
                <input type="text" name='add' onChange={formHandler} value={inputValue.add} className="form-control" id="exampleInputPassword1" placeholder="Address" />
            </div>
            <div className='mb-3 col-lg-12 col-md-12 col-12'>
                <label for="exampleInputPassword1">Description</label>
                <textarea name='desc' onChange={formHandler} value={inputValue.desc} className="form-control" id='' cols='30' rows='5'></textarea>
            </div>

            <button type="submit" onClick={updatedata} className="btn btn-primary">Submit</button>
        </div>
    </form>
</div>
  )
}

export default Edit

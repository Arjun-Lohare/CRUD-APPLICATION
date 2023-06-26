import React, { useContext, useState } from 'react'
import { json, NavLink, useNavigate } from 'react-router-dom'
// import { adddata } from './context/ContextProvider';


function Register() {
    // const {udata,setUdata} = useContext(adddata);
    const navigate = useNavigate("");
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    });
    const formHandler = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setInputValue((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const addinpdata = async (e) => {
        e.preventDefault();
        const { name, email, age, mobile, work, add, desc } = inputValue;

        const res = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, work, add, desc
            })
        });
        const data = await res.json();
        console.log(data);

        if (data.status === 404 || !data) {
            alert("error");
            console.log("error");
        } else {
            alert("data added successfully");
            navigate('/');
            // setUdata(data);
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
                        <input type="number" name='age' onChange={formHandler} value={inputValue.age} className="form-control" id="exampleInputPassword1" placeholder="Ente age" />
                    </div>
                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label for="exampleInputPassword1">Mobile</label>
                        <input type="number" name='mobile' onChange={formHandler} value={inputValue.mobile} className="form-control" id="exampleInputPassword1" placeholder="Mobile" />
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

                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register

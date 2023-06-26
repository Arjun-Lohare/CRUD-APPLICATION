const { json } = require('express');
const express = require('express');
const router = express.Router();
const users = require("../models/userSchema");



// router.get('/',(req,res)=>{
//     res.send('Hello world from router js')
// });

// router.get('/register',(req,res)=>{
//     res.send({
//         "name":"Arjun",
//         "email":"arjun@gmail.com",
//         "age":"22",
//         "mobile": "7776860585",
//         "work": "job",
//         "add" : "Latur",
//         "desc": "Hello Test"
//     })
// });

router.post('/register', async(req,res)=>{
    // console.log(req.body);
//   return  res.json({Message: req.body});
    const {name,email,age,mobile,work,add,desc} = req.body;

    if(!name || !email || !age || !mobile || !work || !add || !desc){
       return res.status(404).json("plz fill the data");
    }

    try{
const preuser = await users.findOne({email:email});
console.log(preuser);

if(preuser){
 return res.status(404).json("user is already present");
}else{
    const adduser = new users({
        name,email,age,mobile,work,add,desc
    });
    await adduser.save();
   return res.status(201).json(adduser);
    console.log(adduser);
}

    } catch(error) {
      return res.status(404).json(error);
    }
});

// To geta userdata

router.get('/getdata',async(req,res)=>{
    try{
const userdata = await users.find();
console.log(userdata);
return res.status(201).json(userdata);
    }catch (error){
        return res.status(404).json(error);
    }
})

// to get individual user data

router.get('/getuser/:id',async(req,res)=>{
    try{
console.log(req.params);
const {id} = req.params;
const individualUser = await users.findById({_id:id});
console.log(individualUser);
return res.status(201).json(individualUser);
    }catch(error) {
return res.status(404).json(error);
    }
})

// to update user data

router.patch('/updatedata/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const updatedUserData = await users.findByIdAndUpdate(id,req.body,{
        new:true
    });
    console.log(updatedUserData);
  return  res.status(201).json(updatedUserData);
    }catch (error){
return res.status(404).json(error);
    }
})

// to delete user

router.delete("/deleteuser/:id", async (req,res)=>{
    try{
    const {id} = req.params;
   const deleteUserData = await users.findByIdAndDelete({_id:id});
console.log(deleteUserData);
return res.status(201).json(deleteUserData);
    }catch(error){
        return res.status(404).json(error);
    }
})


module.exports = router;
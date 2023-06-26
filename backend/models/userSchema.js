const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique: true
    },
    work:{
        type:String,
        reuired:true
    },
    add:{
        type:String,
        reuired:true
    },
    desc:{
        type:String,
        reuired:true
    }
});

const users = new mongoose.model('users',userSchema);

module.exports = users;
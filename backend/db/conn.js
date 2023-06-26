const mongoose = require('mongoose');
const DB ='mongodb://127.0.0.1:27017/MernStack';  // MongoDB Compass
// const DB = 'mongodb+srv://Arjun:wBCMZQqKgyo4dh2W@cluster0.zejjnfe.mongodb.net/MernStack?retryWrites=true&w=majority';  // MongoDB Atlas
mongoose.set('strictQuery',false);
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB connected');
}).catch((error)=>{
    console.log(error.mesage);
})
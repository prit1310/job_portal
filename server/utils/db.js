require('dotenv').config();
const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI;

const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection success with dabase");
    } catch (error) {
        console.log("database connecction failed");
        process.exit(0)
    }
}

module.exports = connectDb
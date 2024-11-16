import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const dbConnection = () => {
    mongoose.connect(process.env.DB_STRING).then(() => {
        console.log("db connected");

    }).catch((error) => {
        console.log(error)
    })

}

export default dbConnection;
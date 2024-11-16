import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    }
    ,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })


const UserDb = mongoose.model("Users", UserSchema)

export default UserDb;


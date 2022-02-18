import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
    }
},
{
    timestamps: true
});

export default mongoose.models.User || mongoose.model('User',UserSchema);;

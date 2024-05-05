import mongoose  from 'mongoose'

const users = new mongoose.Schema({
    email: String,
    name:String,
    password:String,
    image:String,
    phone:Number
},{
    timestamps:true
});
export default mongoose.model("users",users);
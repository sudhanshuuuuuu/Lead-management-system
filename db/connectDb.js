import mongoose from "mongoose";
const connectDb=async()=>{
    if(mongoose.connections[0].readyState) return;
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    }catch(err){
        console.log("db connection error",err);
    }
}
export default connectDb;
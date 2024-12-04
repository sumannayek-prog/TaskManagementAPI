const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error to connect database",err);        
    }
}

module.exports=connectDB;
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://samikshasalunkhe18:Pass123@internship-project.umrerd2.mongodb.net/"

export const connectDB = async ()=>{
  try{
    await mongoose.connect(MONGO_URI);
    console.log('Mongodb connected succesfully');
  }
  
  catch(error){
    console.error('mongodb connection failed',error);
    process.exit (1);
  };
};
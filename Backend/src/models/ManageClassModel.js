import mongoose from "mongoose";

const manageClassSchema = new mongoose.Schema({
  
   department:{
 type:String,
    required:true
  } ,

  semester:{
 type:Number,
    required:true
  } ,
  
  date: {
    type:String,
    required:true
  },

  day:{
 type:String,
    required:true
  } ,
  time:{
 type:String,
    required:true,
    unique:true
  } ,
  previousLecture:{
 type:String,
    required:true
  } ,
  previousStaff:{
 type:String,
    required:true
  },
  manageLecture: 
  {
     type:String,
    required:true
  },
  manageStaff: {
     type:String,
    required:true
  },
});

export const manageClassModel = mongoose.model("manageClassModel", manageClassSchema);

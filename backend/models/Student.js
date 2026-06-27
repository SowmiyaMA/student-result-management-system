const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  regNo: String,
  department: {
    type:String,
    default:"MCA"
  },

  attendence:String,

  semester: { type: String, default: 1 },
  year: { type: String, default: "1st Year" },
  credits:{type:String, default:36},

  subjects:{type:String, default:12},

  photo:String,
  resetOTP: {
    type: String,
    default: null
  },

  otpExpiry: {
    type: Date,
    default: null
  },

  role: {
    type: String,
    default: "student"
  },
  dob:{
    type:Date,
    required:true
  },

  cgpa: {
    type: Number,
    default: 0
  }
 
});

module.exports = mongoose.model("Student", studentSchema);
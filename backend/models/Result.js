const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

  regNo: String,

  semester: Number,

  marks: [
    {
      subject: String,
      mark: Number
    }
  ],
  attendance: Number,

  assignment: Number,

  pass: Number,

  cgpa: Number

});

module.exports = mongoose.model("Result", resultSchema);
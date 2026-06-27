require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const path = require("path");

const Student = require("./models/Student");
const Result = require("./models/Result");


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const users = [
  {
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin"
  },
  {
    email: "faculty@gmail.com",
    password: "faculty123",
    role: "faculty"
  },
];

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.get("/student/:email", async (req,res)=>{

   try{

      const student = await Student.findOne({
         email: req.params.email
      }).select("-password");

     if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ success:false,
      error: err.message });
         
      };
    });
   

app.get("/result/:regNo/:semester", async (req, res) => {

  try {

    const result = await Result.findOne({
      regNo: req.params.regNo,
      semester: req.params.semester
    });

    res.json(result);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }

});

app.get("/subjectsdetails", (req, res) => {

    console.log(req.query.semester);
    const semester = req.query.semester;

    if(semester=="1"){
    res.json([
        {
        title: "Network Programming",
        faculty: "Dr.Valarmathi",
        code: "CS2101",
        credits: 3,
        internal: "28 / 30",
        assignment: "10 / 10",
        attendance: 95,
        color: "#2563eb"
        },
        {
        title: "Software Engineering",
        faculty: "Dr.Karthiyayini",
        code: "CS2102",
        credits: 3,
        internal: "25 / 30",
        assignment: "8 / 10",
        attendance: 88,
        color: "#f97316"
      }]
    );
} else{
      res.json([
    {
      title: "UI / UX",
      faculty: "Dr.Geetha",
      code: "CS201",
      credits: 3,
      internal: "27 / 30",
      assignment: "9 / 10",
      attendance: 92,
      color: "#2563eb"
    },
    {
      title: "Mobile Application Development",
      faculty: "Dr.Valarmathi",
      code: "CS402",
      credits: 3,
      internal: "25 / 30",
      assignment: "8 / 10",
      attendance: 88,
      color: "#f97316"
    },
    {
      title: "Foundation of Data Science",
      faculty: "Dr.Karthiyayini",
      code: "CS403",
      credits: 3,
      internal: "28 / 30",
      assignment: "10 / 10",
      attendance: 75,
      color: "#14b8a6"
    },


    {
      title: "Full Stack Web Development",
      faculty: "Dr.Geetha",
      code: "CS204",
      credits: 4,
      internal: "29 / 30",
      assignment: "10 / 10",
      attendance: 95,
      color: "#0ea5e9"
    },

    {
      title: "Quantum Computing",
      faculty: "Dr.Sujatha",
      code: "CS405",
      credits: 3,
      internal: "25 / 30",
      assignment: "8 / 10",
      attendance: 88,
      color: "#8b5cf6"
    },  

    {
      title: "Network Programming",
      faculty: "Dr.Valarmathi",
      code: "CS406",
      credits: 3,
      internal: "26 / 30",
      assignment: "9 / 10",
      attendance: 90,
      color: "#22c55e"
    }
  ]);
};
});

app.get("/performance/:regNo/:semester", async (req, res) => {
  try {

    const result = await Result.findOne({
      regNo: req.params.regNo,
      semester: Number(req.params.semester)
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found"
      });
    }

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false
    });
  }
});
app.get("/result/:regNo/:semester", async (req, res) => {
  try {
    const result = await Result.findOne({
      regNo: req.params.regNo,
      semester: Number(req.params.semester)
    });

    if (!result) {
      return res.json({
        success: false,
        message: "Result not found"
      });
    }

    return res.json({
      success: true,
      result
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
app.post("/check-result", async (req, res) => {
  try {
    const { regNo, dob } = req.body;

    if (!regNo || !dob) {
      return res.json({
        success: false,
        message: "Register number and DOB required"
      });
    }

    // ✅ STUDENT COLLECTION ONLY
    const student = await Student.findOne({
      regNo: regNo.trim()
    });

    if (!student) {
      return res.json({
        success: false,
        message: "Invalid Register Number"
      });
    }

    // ✅ DOB CHECK FROM STUDENT
    const dbDob = new Date(student.dob).toISOString().split("T")[0];

    if (dbDob !== dob) {
      return res.json({
        success: false,
        message: "Invalid DOB"
      });
    }

    return res.json({
      success: true,
      student
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
app.get("/results/:regNo", async (req, res) => {
  try {
    const results = await Result.find({
      regNo: req.params.regNo
    });

    if (!results || results.length === 0) {
      return res.json({
        success: true,
        results: []
      });
    }

    return res.json({
      success: true,
      results
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log("LOGIN REQUEST:", email);

    const student = await Student.findOne({ email });

    if (!student) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }
     console.log("INPUT PASSWORD:", password);
    console.log("DB PASSWORD:", student.password);


    const isMatch = await bcrypt.compare(password.trim(), student.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password"
      });
    }

    return res.json({
      success: true,
      user:student
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, regNo, department,dob } = req.body;

    const userExists = await Student.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      regNo,
      department,
      dob,
      role:"student"
    });

    await newStudent.save();

    res.json({
      success: true,
      message: "Registered Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
app.put("/update-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await Student.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Old password wrong" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save(); // 👉 updates MongoDB

    res.json({ success: true, message: "Password updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Student.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email not found"
      });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // store OTP in MongoDB
    user.resetOTP = otp.toString();
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    console.log("OTP generated:", otp);

    res.json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (err) {
    console.log("OTP ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.post("/verify-otp", async (req, res) => {

    const { email, otp } = req.body;

    const user = await Student.findOne({ email });

    if (!user) {
        return res.json({
            success: false,
            message: "User not found"
        });
    }

    if (String(user.resetOTP) !== String(otp)) {
        return res.json({
            success: false,
            message: "Invalid OTP"
        });
    }

    if (user.otpExpiry < Date.now()) {
        return res.json({
            success: false,
            message: "OTP expired"
        });
    }

    res.json({
        success: true,
        message: "OTP verified"
    });

});

app.post("/reset-password", async (req, res) => {
  try {

    const { email, newPassword } = req.body;

    const user = await Student.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      success: true,
      message: "Password Updated"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
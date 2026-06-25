require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

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
  {
    email: "sowmiyama2005@gmail.com",
    password: "6209",
    role: "student",
    name: "Sowmiya M.A",
    cgpa: "8.9"
  }
];

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.get("/student", (req, res) => {
  res.json({
    name:"Sowmiya M.A",
      regNo:"810025622037",
      email:"sowmiyama2005@gmail.com",
      semester:"2",
      year:1,
      department:"MCA",
      subjects:12,
      cgpa:"8.90",
      credits:"36",
      attendance:"95%",
      semester1:{
      marks:[
        {subject:"NP",mark:73},
        {subject:"SE",mark:84},
        {subject:"DSAP",mark:82},
        {subject:"AJP",mark:80},
        {subject:"DEV",mark:86},
        {subject:"MFCA",mark:85}
      ]
    },

    semester2:{
      marks:[
        {subject:"UIUX",mark:77},
        {subject:"QC",mark:84},
        {subject:"FDS",mark:83},
        {subject:"FSWD",mark:92},
        {subject:"MAD",mark:84},
        {subject:"NPM",mark:89}
      ]

    }
  });
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

app.get("/performance", (req,res)=>{

  const semester = req.query.semester;

  if(semester=="1"){
    res.json({
      attendance:90,
      assignment:85,
      pass:95,
      cgpa:8.4
    });
  }

  else{
     res.json({
      attendance:94,
      assignment:90,
      pass:98,
      cgpa:8.9
    });
  }

});
app.post("/check-result", (req, res) => {

    const { regNo, dob } = req.body;

    if (
        regNo === "810025622037" &&
        dob === "2005-02-02"
    ) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

const Student = require("./models/Student");
const bcrypt = require("bcryptjs");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, regNo, department } = req.body;

    const userExists = await Student.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      regNo,
      department
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
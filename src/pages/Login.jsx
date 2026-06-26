import { useState } from "react";
import profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaUserPlus,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function Login() {

  // STATES
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // LOGIN FUNCTION
  function loginUser() {

  if (email === "" || password === "") {
    alert("Please fill all fields!");
    return;
  }

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(res => res.json())
    .then(data => {

      console.log(data);
      
      if (!data.success || !data.user) {
        alert(data.message||"Invalid Login Credentials!");
        return;
      }
      

      const user = data.user;
      

        localStorage.setItem("email",data.user.email );
        localStorage.setItem("regNo", data.user.regNo);
        localStorage.setItem("student", JSON.stringify(user));

      if (user.role !== role) {
          alert("Selected role is incorrect");
          return;
      }
      if (user.role === "admin") {

        alert("Admin Login Successful!");
        navigate("/admin-dashboard");

      }

      else if (user.role === "faculty") {

        alert("Faculty Login Successful!");
        navigate("/faculty-dashboard");

      }

      else {

        alert("Student Login Successful!");

        
        navigate("/student-dashboard");
      }

    })
    .catch(err => {
      console.log(err);
      alert("Server Error");
    });
}

  return (
    <>
    <style>
      {`
      *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins', sans-serif;
}

html,
#root,
body{
    width:100%;
    min-height:100vh;
    overflow-x:hidden;
}

/* MAIN CONTAINER */

.main-container{
    width:100%;
    min-height:100vh;
    display:flex;
}

/* LEFT SECTION */

.left-section{
    width:55%;
    min-height:100vh;
    background:linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),
    url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1974&auto=format&fit=crop');
    background-size:cover;
    background-position:center;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:50px;
}

.content{
    text-align:center;
    max-width:500px;
}

.graduation-img{
    width:180px;
    margin-bottom:20px;
}

.tagline{
    color:#1f2d5a;
    font-size:20px;
    margin-bottom:25px;
}

h1{
    font-size:58px;
    line-height:1.2;
    color:#0d2463;
    margin-bottom:25px;
    font-weight:700;
}

.line{
    width:120px;
    height:4px;
    background:#1d4ed8;
    margin:0 auto 25px;
    border-radius:10px;
}

.description{
    font-size:20px;
    line-height:1.8;
    color:#444;
}

/* RIGHT SECTION */

.right-section{
    width:45%;
    min-height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;

    background:#f5f7fb;

    padding:40px;
}

.login-box{
    width:100%;
    max-width:500px;

    background:white;

    padding:50px 40px;

    border-radius:25px;

    box-shadow:0 10px 40px rgba(0,0,0,0.1);
}

.login-box h2{
    font-size:42px;
    color:#0d2463;
    text-align:center;
    margin-bottom:10px;
}

.login-text{
    text-align:center;
    color:#666;
    margin-bottom:40px;
    font-size:18px;
}

/* INPUT BOX */

.input-box{
    width:100%;
    height:65px;

    border:1px solid #dcdcdc;
    border-radius:14px;
    position: relative;
    display:flex;
    align-items:center;
    gap: 10px;
    padding:0 20px;

    margin-bottom:25px;

    background:#fff;
}

.input-box i{
    color:#777;
    font-size:20px;
}

#eye{
    cursor:pointer;
}

.input-box input{
    width:100%;
    border:none;
    outline:none;
    font-size:17px;
    margin-left:15px;
}
.eye-icon{
    position:absolute;
    right:15px;
    top:50%;
    transform:translateY(-50%);
    cursor:pointer;
    color:#555;
}
.eye{
    cursor:pointer;
}

/* OPTIONS */

.options{
    display:flex;
    justify-content:space-between;
    align-items:center;

    margin-bottom:30px;

    font-size:15px;
}

.options label{
    display:flex;
    align-items:center;
    gap:8px;
    color:#555;
}

.options a{
    text-decoration:none;
    color:#2563eb;
    font-weight:500;
}

select{
    width:100%;
    padding:14px;
    margin-bottom:20px;
    border:1px solid #ccc;
    border-radius:10px;
    font-size:16px;
    outline:none;
}

/* BUTTONS */

.login-btn{
    width:100%;
    height:60px;

    border:none;
    border-radius:14px;

    background:#2563eb;
    color:white;

    font-size:20px;
    font-weight:600;

    cursor:pointer;

    transition:0.3s;
}

.login-btn:hover{
    background:#1748b8;
}

.divider{
    text-align:center;
    margin:30px 0;
    position:relative;
}

.divider::before{
    content:'';
    position:absolute;
    width:40%;
    height:1px;
    background:#ccc;
    left:0;
    top:50%;
}

.divider::after{
    content:'';
    position:absolute;
    width:40%;
    height:1px;
    background:#ccc;
    right:0;
    top:50%;
}

.divider span{
    background:#fff;
    padding:0 10px;
    color:#888;
}

/* REGISTER BUTTON */

.register-btn{
    width:100%;
    height:60px;

    border:2px solid #2563eb;
    border-radius:14px;

    background:white;
    color:#2563eb;

    font-size:18px;
    font-weight:600;

    cursor:pointer;

    transition:0.3s;
}

.register-btn i{
    margin-right:10px;
}

.register-btn:hover{
    background:#2563eb;
    color:white;
}

.footer{
    text-align:center;
    margin-top:35px;
    color:#777;
    font-size:14px;
}



/* ========================= */
/* MOBILE RESPONSIVE */
/* ========================= */

@media(max-width:992px){

    .main-container{
        flex-direction:column;
    }

    .left-section{
        width:100%;
        min-height:45vh;
        padding:40px 20px;
    }

    .right-section{
        width:100%;
        min-height:55vh;
        padding:20px;
    }

    h1{
        font-size:38px;
    }

    .description{
        font-size:16px;
    }

    .graduation-img{
        width:130px;
    }

    .login-box{
        padding:35px 25px;
    }

    .login-box h2{
        font-size:32px;
    }
}

/* SMALL MOBILE */

@media(max-width:576px){

    .left-section{
        min-height:40vh;
    }

    h1{
        font-size:30px;
    }

    .tagline{
        font-size:16px;
    }

    .description{
        font-size:15px;
        line-height:1.6;
    }

    .input-box{
        height:55px;
    }

    .login-btn,
    .register-btn{
        height:55px;
        font-size:16px;
    }

    .options{
        flex-direction:row;
        gap:15px;
        align-items:flex-start;
    }
}`}
    </style>

    <div className="main-container">

      {/* LEFT SECTION */}

      <div className="left-section">

        <div className="overlay"></div>

        <div className="content">

          <img
            src={profile}
            alt="Graduation"
            className="graduation-img"
          />

          <p className="tagline">
            Empowering Education with Technology
          </p>

          <h1>
            College Result <br />
            Management System
          </h1>

          <div className="line"></div>

          <p className="description">
            A smart and efficient platform to manage
            student results, performance and analytics
            seamlessly.
          </p>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="right-section">

        <div className="login-box">

          <h2>Welcome Back!</h2>

          <p className="login-text">
            Login to your account to continue
          </p>

          {/* EMAIL */}

          <div className="input-box">

            <FaUser />

            <input
              type="text"
              placeholder="Enter Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* PASSWORD */}

          <div className="input-box">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }
            </span>

          </div>

          {/* ROLE */}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >

            <option value="">
              Select Role
            </option>

            <option value="student">
              Student
            </option>

            <option value="faculty">
              Faculty
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          {/* OPTIONS */}

          <div className="options">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <Link to="/forgot-password">
              Forgot Password?
          </Link>

          </div>

          {/* LOGIN BUTTON */}

          <button
            className="login-btn"
            onClick={loginUser}
          >
            Login
          </button>

          {/* DIVIDER */}

          <div className="divider">
            <span>OR</span>
          </div>

          {/* REGISTER BUTTON */}

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >

            <FaUserPlus />

            Register New Account

          </button>

          {/* FOOTER */}

          <p className="footer">
            © 2026 College Result Management System.
            All rights reserved.
          </p>

        </div>

      </div>

    </div>
    </>
  );
}

export default Login;
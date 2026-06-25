import { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaIdCard,
    FaBuilding,
    FaLock
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    // STATES

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [roll, setRoll] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // REGISTER FUNCTION

    function registerStudent() {

        // VALIDATION

        if (
            name === "" ||
            email === "" ||
            roll === "" ||
            department === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            alert("Please fill all fields!");
            return;
        }

        // EMAIL VALIDATION

        let emailPattern =
            /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email.match(emailPattern)) {

            alert("Enter valid email!");
            return;
        }

        // PASSWORD LENGTH

        if (password.length < 4) {

            alert(
                "Password must contain minimum 4 characters!"
            );

            return;
        }

        // PASSWORD MATCH

        if (password !== confirmPassword) {

            alert("Passwords do not match!");
            return;
        }
        fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password,
            regNo: roll,        // IMPORTANT FIX (backend expects regNo)
            department
        })
    })
    .then(res => res.json())
    .then(data => {

        if (!data.success) {
            alert(data.message || "Registration failed!");
            return;
        }
        alert("Registration Successful!");

        // REDIRECT
        setTimeout(() => {

            navigate("/");

        }, 1500);
        })
    .catch(err => {
        console.log(err);
        alert("Server Error");
    });

    }

    return (

        <>

        <style>{`

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:'Poppins',sans-serif;
            }

            body{
                min-height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:linear-gradient(
                    to right,
                    #bbc3d3,
                    #4675c7
                );
                padding:30px;
            }

            .register-container{
                width:100%;
                min-height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
            }

            .register-box{
                width:450px;
                background:white;
                padding:40px;
                border-radius:20px;
                box-shadow:0 5px 20px rgba(0,0,0,0.2);
            }

            .register-title{
                text-align:center;
                margin-bottom:10px;
                color:#0f172a;
                font-size:32px;
            }

            .sub-text{
                text-align:center;
                color:gray;
                margin-bottom:25px;
            }

            .input-box{
                position:relative;
                margin-bottom:18px;
            }

            .input-box input,
            .input-box select{
                width:100%;
                padding:14px 45px;
                border:1px solid #ccc;
                border-radius:10px;
                font-size:15px;
                outline:none;
            }

            .input-box input:focus,
            .input-box select:focus{
                border-color:#2563eb;
            }

            .input-icon{
                position:absolute;
                left:15px;
                top:16px;
                color:#2563eb;
                font-size:16px;
            }

            .register-btn{
                width:100%;
                padding:14px;
                border:none;
                background:#2563eb;
                color:white;
                font-size:17px;
                border-radius:10px;
                cursor:pointer;
                transition:0.3s;
                margin-top:10px;
            }

            .register-btn:hover{
                background:#1d4ed8;
            }

            .login-link{
                text-align:center;
                margin-top:20px;
                font-size:15px;
            }

            .login-link a{
                text-decoration:none;
                color:#2563eb;
                font-weight:500;
            }

            /* TABLET */

            @media(max-width:789px){

                .register-box{
                    width:90%;
                    padding:35px 25px;
                }

                .register-title{
                    font-size:28px;
                }
            }

            /* MOBILE */

            @media(max-width:480px){

                body{
                    padding:15px;
                }

                .register-box{
                    width:100%;
                    padding:28px 18px;
                    border-radius:16px;
                }

                .register-title{
                    font-size:24px;
                }

                .sub-text{
                    font-size:14px;
                }

                .input-box input,
                .input-box select{
                    padding:12px 42px;
                    font-size:14px;
                }

                .register-btn{
                    padding:12px;
                    font-size:15px;
                }

                .login-link{
                    font-size:14px;
                }
            }

        `}</style>

        <div className="register-container">

            <div className="register-box">

                <h2 className="register-title">
                    Student Registration
                </h2>

                <p className="sub-text">
                    Create your student account
                </p>

                {/* NAME */}

                <div className="input-box">

                    <FaUser className="input-icon" />

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                </div>

                {/* EMAIL */}

                <div className="input-box">

                    <FaEnvelope className="input-icon" />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                {/* ROLL NUMBER */}

                <div className="input-box">

                    <FaIdCard className="input-icon" />

                    <input
                        type="text"
                        placeholder="Roll Number"
                        value={roll}
                        onChange={(e) =>
                            setRoll(e.target.value)
                        }
                    />

                </div>

                {/* DEPARTMENT */}

                <div className="input-box">

                    <FaBuilding className="input-icon" />

                    <select
                        value={department}
                        onChange={(e) =>
                            setDepartment(e.target.value)
                        }
                    >

                        <option value="">
                            Select Department
                        </option>
                        <option>MCA</option>
                        <option>CSE</option>
                        <option>IT</option>
                        <option>ECE</option>
                        <option>EEE</option>
                        <option>MECH</option>

                    </select>

                </div>

                {/* PASSWORD */}

                <div className="input-box">

                    <FaLock className="input-icon" />

                    <input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="input-box">

                    <FaLock className="input-icon" />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                </div>

                {/* BUTTON */}

                <button
                    className="register-btn"
                    onClick={registerStudent}
                >
                    Register
                </button>

                {/* LOGIN LINK */}

                <div className="login-link">

                    Already have an account?{" "}

                    <Link to="/">
                        Login
                    </Link>

                </div>

            </div>

        </div>

        </>
    );
}

export default Register;
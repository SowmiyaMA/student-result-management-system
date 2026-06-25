import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

function ForgotPassword() {

    const navigate = useNavigate();

    // STATE
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    // RESET PASSWORD FUNCTION
async function resetPassword() {

    console.log("Forgot password clicked");

    if (!email) {
        alert("Enter email");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        console.log("Response:", data);

        if (data.success) {

            setSuccess(true);
            alert("OTP Sent Successfully");

            navigate("/verify-otp", {
                state: { email }
            });

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log("ERROR:", err);
        alert("Server not running or API error");

    }
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
            background:#f1f5f9;
        }

        .forgot-page{
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:linear-gradient(to right,#9facc6,#2a549e);
            padding:20px;
        }

        .forgot-container{
            width:100%;
            max-width:400px;
            background:white;
            padding:40px;
            border-radius:20px;
            box-shadow:0 5px 20px rgba(0,0,0,0.2);
        }

        .forgot-container h2{
            text-align:center;
            margin-bottom:10px;
            color:#0f172a;
        }

        .forgot-text{
            text-align:center;
            color:gray;
            margin-bottom:25px;
        }

        .input-box{
            position:relative;
            margin-bottom:20px;
        }

        .input-box input{
            width:100%;
            padding:14px 45px;
            border:1px solid #ccc;
            border-radius:10px;
            font-size:16px;
            outline:none;
        }

        .input-box svg{
            position:absolute;
            left:15px;
            top:16px;
            color:#2563eb;
        }

        .forgot-btn{
            width:100%;
            padding:14px;
            border:none;
            background:#2563eb;
            color:white;
            font-size:17px;
            border-radius:10px;
            cursor:pointer;
            transition:0.3s;
        }

        .forgot-btn:hover{
            background:#1d4ed8;
        }

        .success{
            text-align:center;
            color:green;
            margin-top:20px;
            font-weight:600;
        }

        .back{
            text-align:center;
            margin-top:20px;
        }

        .back a{
            text-decoration:none;
            color:#2563eb;
            font-weight:500;
        }

        /* RESPONSIVE */

        @media(max-width:480px){

            .forgot-container{
                padding:30px 20px;
            }

            .forgot-container h2{
                font-size:24px;
            }

            .input-box input{
                padding:12px 42px;
                font-size:14px;
            }

            .forgot-btn{
                padding:12px;
                font-size:15px;
            }
        }

        `}</style>

        <div className="forgot-page">

            <div className="forgot-container">

                <h2>Forgot Password</h2>

                <p className="forgot-text">
                    Enter your registered email address
                </p>

                {/* EMAIL */}

                <div className="input-box">

                    <FaEnvelope />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                {/* BUTTON */}

                <button
                    className="forgot-btn"
                    onClick={resetPassword}
                >
                    Send Reset Link
                </button>

                {/* SUCCESS */}

                {
                    success && (
                        <div className="success">
                            Reset link sent successfully!
                        </div>
                    )
                }

                {/* BACK */}

                <div className="back">

                    <Link to="/">
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </div>

        </>
    );
}

export default ForgotPassword;
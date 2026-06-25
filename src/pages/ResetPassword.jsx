import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const [newPassword, setNewPassword] = useState("");

    async function resetPassword() {

    console.log("Update Password Clicked");

    try {

        const res = await fetch("http://localhost:5000/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                newPassword
            })
        });

        const data = await res.json();

        console.log("Response:", data);

        if (data.success) {

            alert("Password Updated Successfully");

            navigate("/");

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

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

            .reset-page{
                min-height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:linear-gradient(135deg,#4f46e5,#2563eb);
                padding:20px;
            }

            .reset-card{
                width:100%;
                max-width:420px;
                background:white;
                padding:40px;
                border-radius:20px;
                box-shadow:0 10px 30px rgba(0,0,0,0.2);
                text-align:center;
            }

            .reset-card h2{
                color:#1e293b;
                margin-bottom:10px;
            }

            .reset-card p{
                color:#64748b;
                margin-bottom:25px;
            }

            .reset-input{
                width:100%;
                padding:14px;
                border:1px solid #cbd5e1;
                border-radius:10px;
                outline:none;
                font-size:16px;
                margin-bottom:20px;
                transition:0.3s;
            }

            .reset-input:focus{
                border-color:#2563eb;
                box-shadow:0 0 8px rgba(37,99,235,0.2);
            }

            .reset-btn{
                width:100%;
                padding:14px;
                border:none;
                border-radius:10px;
                background:#2563eb;
                color:white;
                font-size:16px;
                font-weight:600;
                cursor:pointer;
                transition:0.3s;
            }

            .reset-btn:hover{
                background:#1d4ed8;
                transform:translateY(-2px);
            }

            .icon{
                width:80px;
                height:80px;
                margin:0 auto 20px;
                border-radius:50%;
                background:#dbeafe;
                display:flex;
                justify-content:center;
                align-items:center;
                font-size:35px;
            }

            @media(max-width:480px){
                .reset-card{
                    padding:30px 20px;
                }

                .reset-card h2{
                    font-size:24px;
                }
            }
        `}</style>

        <div className="reset-page">
            <div className="reset-card">

                <div className="icon">
                    🔒
                </div>

                <h2>Reset Password</h2>

                <p>
                    Create a new secure password for your account
                </p>

                <input
                    className="reset-input"
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                    className="reset-btn"
                    onClick={resetPassword}
                >
                    Update Password
                </button>

            </div>
        </div>
    </>
);
}

export default ResetPassword;
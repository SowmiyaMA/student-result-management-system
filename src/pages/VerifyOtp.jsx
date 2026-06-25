import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    async function verifyOtp() {

        if (!otp) {
            alert("Please enter OTP");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            const data = await res.json();

            if (data.success) {
                alert("OTP Verified Successfully");

                // go to reset password page
                navigate("/reset-password", { state: { email } });

            } else {
                alert(data.message || "Invalid OTP");
            }

        } catch (error) {
            console.log(error);
            alert("Server error");
        }

        setLoading(false);
    }

    return (
        <div style={styles.container}>
            <div style={styles.box}>

                <h2>Verify OTP</h2>

                <p>Enter OTP sent to your email</p>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={styles.input}
                />

                <button
                    onClick={verifyOtp}
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4f46e5, #2563eb)"
    },
    box: {
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        width: "320px",
        textAlign: "center",
        boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
    },
    input: {
        width: "100%",
        padding: "12px",
        marginTop: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px"
    },
    button: {
        width: "100%",
        marginTop: "15px",
        padding: "12px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px"
    }
};

export default VerifyOtp;
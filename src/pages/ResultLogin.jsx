import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function ResultLogin() {

    // STATES
    const navigate = useNavigate();
    const location = useLocation();
    const [regno, setRegno] = useState("");
    const [dob, setDob] = useState("");

    // CHECK RESULT FUNCTION
    function checkResult() {

    fetch("http://localhost:5000/check-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            regNo: regno,
            dob: dob
        })
    })
    .then(res => res.json())
    .then(data => {

    if(data.success){

        localStorage.setItem(
            "student",
            JSON.stringify(data.student)
        );

        alert("Result Found Successfully!");

        if(location.state?.from === "dashboard"){

            navigate("/student-result",{
                state:{ semester:2 }
            });

        }else{

            navigate("/marksheet",{
                state:{ semester:1 }
            });

        }

    }else{

        alert(data.message);

    }

})
    }
    return (
        <>
        <style>
            {`
            *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

/* BODY */

body{
    min-height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;

    background:#f1f5f9;

    padding:20px;
}

/* RESULT CONTAINER */

.result-container{
    width:100%;

    display:flex;
    justify-content:center;
    align-items:center;
}

/* RESULT BOX */

.result-box{
    width:100%;
    max-width:500px;

    background:white;

    padding:40px;

    border-radius:20px;

    box-shadow:0 5px 15px rgba(0,0,0,0.1);

    position:relative;
}

/* BACK BUTTON */

.back-btn{
    width:45px;
    height:45px;

    background:#ffffff;
    color:#000;

    border-radius:50%;

    display:flex;
    align-items:center;
    justify-content:center;

    text-decoration:none;
    font-size:18px;

    margin-bottom:20px;

    transition:0.3s;

    box-shadow:0 4px 10px rgba(0,0,0,0.15);
}

.back-btn:hover{
    background:#f8f8f8;
    transform:translateX(-5px);
}

/* TITLE */

.result-box h2{
    text-align:center;
    margin-bottom:30px;
    color:#2563eb;
    font-size:30px;
}

/* INPUT BOX */

.input-box{
    margin-bottom:20px;
}

.input-box label{
    display:block;
    margin-bottom:8px;
    font-size:15px;
    font-weight:500;
}

.input-box input{
    width:100%;

    padding:14px;

    border:1px solid #ccc;
    border-radius:10px;

    outline:none;

    font-size:15px;

    transition:0.3s;
}

.input-box input:focus{
    border-color:#2563eb;
}

/* BUTTON */

.btn{
    width:100%;

    padding:14px;

    border:none;

    background:#2563eb;
    color:white;

    border-radius:10px;

    cursor:pointer;

    font-size:16px;
    font-weight:500;

    transition:0.3s;
}

.btn:hover{
    background:#1d4ed8;
}

/* =========================
   TABLET RESPONSIVE
========================= */

@media(max-width:789px){

    .result-box{
        max-width:90%;
        padding:35px 25px;
    }

    .result-box h2{
        font-size:26px;
    }

    .input-box input{
        padding:13px;
    }

    .btn{
        padding:13px;
        font-size:15px;
    }
}

/* =========================
   MOBILE RESPONSIVE
========================= */

@media(max-width:480px){

    body{
        padding:15px;
    }

    .result-box{
        max-width:100%;
        padding:30px 20px;
        border-radius:16px;
    }

    .result-box h2{
        font-size:22px;
        margin-bottom:25px;
    }

    .back-btn{
        width:40px;
        height:40px;
        font-size:16px;
    }

    .input-box label{
        font-size:14px;
    }

    .input-box input{
        padding:12px;
        font-size:14px;
    }

    .btn{
        padding:12px;
        font-size:14px;
    }

`}</style>        
        
        <div className="result-container">
          
            <div className="result-box">

                {/* BACK BUTTON */}

                <a href="/student-dashboard" className="back-btn">

                    <FaArrowLeft />

                </a>

                <h2>Check Your Result</h2>

                {/* REGISTER NUMBER */}

                <div className="input-box">

                    <label>Register Number</label>

                    <input
                        type="text"
                        placeholder="Enter Register Number"
                        value={regno}
                        onChange={(e) =>
                            setRegno(e.target.value)
                        }
                    />

                </div>

                {/* DOB */}

                <div className="input-box">

                    <label>Date of Birth</label>

                    <input type="date" value={dob} onChange={(e) =>setDob(e.target.value)} />

                </div>

                {/* BUTTON */}

                <button
                    className="btn"
                    onClick={checkResult}
                >

                    See Result

                </button>

            </div>
           
        </div>
         </>
    );

}
export default ResultLogin;

import { FaUserGraduate,FaHome,FaBook,FaPoll,FaGraduationCap,FaBookOpen, FaTrophy, FaCoins, FaAward} from "react-icons/fa";
import StudentSidebar from "../components/StudentSidebar";
import ResultLogin from "./ResultLogin";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentDashboard() {

    const [student, setStudent] = useState(null);
    const [results, setResults] = useState([]);

 useEffect(() => {
    const data = localStorage.getItem("student");

    console.log("Local Storage:", data);

    if (!data || data === "undefined") {
        console.log("No student data found");
        setStudent(null);
        return;
    }

    try {
        const user = JSON.parse(data);
        setStudent(user);

         localStorage.setItem("regNo", user.regNo);
    } catch (err) {
        console.log("JSON Parse Error:", err);
        localStorage.removeItem("student");
        setStudent(null);
    }
}, []);


useEffect(() => {
  if (!student?.regNo) return;

  fetch(`http://localhost:5000/results/${student.regNo}`)
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data);

      if (data.success) {
        setResults(data.results);   // ✅ IMPORTANT FIX
      } else {
        setResults([]);
      }
    })
    .catch(err => console.log(err));

}, [student]);
const sem1 = results.find(r => r.semester == 1);
const sem2 = results.find(r => r.semester == 2);

    const [showResultLogin, setShowResultLogin] = useState(false);

     if(showResultLogin){

        return <ResultLogin />;
    }


    return (
        <>
        <style>
            {`
             *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Poppins,sans-serif;
}

body{
    background:#f1f5f9;
}

.dashboard{
    display:flex;
    width:100vw;
}
.navbar h1{
    font-size: 34px;
}
/* MAIN */

.dashboard-main{
    margin-left:260px;
    flex:1;
    padding:30px;
    min-height:100vh;

}

.menu-link span,
.menu li span{
    margin-left:15px;
    white-space:nowrap;
}

/* NON LINK MENU */

.menu li:not(:has(.menu-link)){
    display:flex;
    align-items:center;
    height:55px;
    padding:0 18px;
}
/* NAVBAR */

.navbar{
    background:white;
    padding:15px 20px;
    border-radius:18px;
    display:flex;
    width:100%;
    max-width:none;
    margin-bottom:25px;
    justify-content:space-between;
    align-items:center;
    box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.profile{
    display:flex;
    align-items:center;
    text-decoration:none;
    color:#111827;
    gap:15px;
    cursor:pointer;
    font-weight:600;
}

.profile img{
    width:50px;
    height:50px;
    border-radius:50%;
    object-fit:cover;
}
/* TEXT */

.menu-link{
    display:flex;
    align-items:center;
    gap:15px;
    color:white;
    text-decoration:none;
    padding:15px 18px;
    width:100%;
    font-size:18px;
}
.menu-link span{
    white-space:nowrap;
}

.result-notification{
    width:100%;
    padding:30px 0;
}

.notification-card{
    background:white;
    width:50%;
    padding:30px;
    border-radius:20px;
    align-items:center;
    justify-content:center;
    margin-left:25%;
    text-align:center;
    box-shadow:0 5px 20px rgba(0,0,0,0.1);
}

.notification-card h2{
    color:#2563eb;
    margin-bottom:15px;
}

.notification-card p{
    color:#555;
    margin-bottom:25px;
    line-height:1.6;
}

.result-btn{
    display:inline-block;
    background:#2563eb;
    color:white;
    text-decoration:none;
    padding:14px 30px;
    border-radius:10px;
    transition:0.3s;
}

.result-btn:hover{
    background:#1d4ed8;
}

/* CARDS */

.cards{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:20px;
    width:100%;
}

.card{
    background:white;
    padding:30px;
    min-height:180px;
    border-radius:20px;
    box-shadow:0 5px 15px rgba(0,0,0,0.1);
    transition: 0.3s;
}
.card:hover{
    transform:translateY(-8px);
}

.card svg{
    font-size:35px;
    color:#2563eb;
    margin-bottom:15px;
}
.card h2{
    margin-bottom:10px;
}

/*Analytics Section*/
    
    .dashboard-grid{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:20px;
        margin-top:25px;
        margin-bottom:25px;
    }

    .dashboard-box{
        background:white;
        padding:25px;
        align-items:center;
        justify-content:center;
        text-align:center;
        border-radius:20px;
        box-shadow:0 5px 15px rgba(0,0,0,.08);
    }

    .dashboard-box h3{
        margin-bottom:15px;
        color:#2563eb;
    }

    .dashboard-box p{
        margin-bottom:10px;
        color:#475569;
    }

/* TABLE */

.table-section{
    background:white;
    margin-top:30px;
    padding:25px;
    border-radius:20px;
    box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

table{
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
}

table th,
table td{
    padding:15px;
    border-bottom:1px solid #ddd;
    text-align:left;
}

table th{
    background:#2563eb;
    color:white;
}

table tr:nth-child(even){
    background:#f8fafc;
}

.pass{
    background:#22c55e;
    color:white;
    padding:5px 12px;
    border-radius:20px;
}
  

@media(min-width:1200px){


.cards{
    grid-template-columns:repeat(5,1fr);
}

.notification-card{
    max-width:1000px;
}

.table-section{
    width:100%;
}

}

/* =========================
   RESPONSIVE
========================= */
@media(max-width:768px){

    body{
        overflow-x:hidden;
        max-width:100%;
    }
    .dashboard{
    display:flex;
    width:100%;
    max-width:100%;
    overflow-x:hidden;
}
   

    /* MAIN */

    .dashboard-main{
        margin-left:90px;
        width:calc(100% - 90px);
        max-width:calc(95% - 90px);
        padding:10px;
        overflow-x:hidden;
    }

    /* NAVBAR */
    .navbar{
        flex-direction:column;
        align-items:center;
        text-align:center;
        padding:15px !important;
        gap:12px;
        padding:12px;
        width:100%;
    }

    .navbar h1{
        font-size:24px;
        line-height:1.2;
    }
    .navbar p{
    font-size:14px;
}
    /* PROFILE */

.profile{
    align-items:center;
    gap:6px;
    text-align:center;
  }

  .profile img{
    width:55px;
    height:55px;
    border-radius:50%;
  }

  .profile span{
    display:block;
    font-size:13px;
    font-weight:600;
  }
    .result-notification{
    padding:15px 0;
  }

  .notification-card{
    width:min(70%,700px);
    margin:0 auto;
    padding:15px;
  }

  .notification-card h2{
    font-size:16px;
  }

  .notification-card p{
    font-size:13px;
    line-height:1.5;
  }


    .result-btn{
        display:inline-block;
        background:#2563eb;
        color:white;
        width:100%;
        height:45px;
        text-decoration:none;
        padding:10px 30px;
        border-radius:10px;
        transition:0.3s;
    }

    .result-btn:hover{
        background:#1d4ed8;
    }
    


    /* DASHBOARD CARDS */
  .cards{
    display:grid;     
    grid-template-columns:repeat(2,1fr);
    gap:10px;
    width:100%;
  }

  .card{
    min-height:120px;
    padding:15px;
  }

  .card h2{
    font-size:24px;
  }

  .card p{
    font-size:14px;
  }
   .dashboard-grid{
        grid-template-columns:1fr;
        width:90%;
        margin-left:5%;
    }


     /* TABLE */
  .table-section{
    overflow-x:auto;
  }

  table{
    width:100%;
    min-width:0;
  }

  table th,
  table td{
    padding:8px;
    word-wrap:break-word;
    font-size:12px;
  }
 } 
    
    @media(max-width:480px){

    .dashboard-main{
        margin-left:70px;
        width:calc(100% - 70px);
        padding:10px;
    }

    .navbar h1{
        font-size:18px;
    }

    .navbar p{
        font-size:13px;
    }

    .notification-card{
        padding:20px;
    }

    .notification-card h2{
        font-size:18px;
    }

    .card{
        padding:15px;
    }

    .cards{
    grid-template-columns:1fr;
    }
    .card h2{
        font-size:22px;
    }

    .result-btn{
        width:100%;
        text-align:center;
    }
}
}`}
        </style>

        <div className="dashboard">

            {/* SIDEBAR */}

           <StudentSidebar/>

            {/* MAIN */}

            <div className="dashboard-main">

                {/* NAVBAR */}

                <div className="navbar">

                    <div>
                        <h1>Student Dashboard</h1><br></br>
                        <p>Welcome back  {student?.name} 👋</p>
                    </div>

                    <div className="profile">
                        <Link to="/profile" className="profile">
                        <img src={student?.photo ? `http://localhost:5000/${student.photo}` : "/default-profile.png"} alt="profile" onError={() => console.log("Image failed to load")}/>
                        <span>
                            {student?.name}
                        </span>
                        </Link>

                    </div>

                </div>
                    <div className="result-notification">

                    <div className="notification-card">

                        <h2>🎉 Semester Results Published</h2>

                        <p>
                            Semester 2 Results are now available.
                            Click below link to check your result.
                            <br></br> 👇
                        </p>

                        <Link to="/result-login" state={{ from: "dashboard" }} className="result-btn"> View Results</Link>                        
                    </div>

                </div>


            {/* CARDS */}

                <div className="cards">

                    <div className="card">

                        <FaGraduationCap/>

                        <h2>
                            {student?.cgpa||"0.00"}
                        </h2>

                        <p>Current CGPA</p>

                    </div>

                    <div className="card">

                       <FaBookOpen/>
                        <h2>{student?.semester}</h2>
                        <p>Current Semester</p>

                    </div>

                    <div className="card">
                        <FaCoins/>
                        <h2>{student?.credits }</h2>
                        <p>Overall Credits</p>
                    </div> 
                    <div className="card">
                       <FaTrophy/>
                       <h2>{student?.attendence??0}</h2>
                       <p>Attendence</p>
                    </div>
                    <div className="card">
                        <FaAward/>
                        <h2>Pass</h2>
                        <p>Overall Status</p>
                    </div>

                </div>

                {/* Analytics Section */}
                <div className="dashboard-grid">

                <div className="dashboard-box">
                    <h3>Student Information</h3>
                    <p><b>Year:</b> {student?.year}</p>
                    <p><b>Department:</b> {student?.department}</p>
                    <p><b>Register No:</b> {student?.regNo}</p>
                    <p><b>Email:</b> {student?.email}</p>
                </div>

                <div className="dashboard-box">
                    <h3>Academic Summary</h3>
                    <p><b>Total Subjects:</b> {student?.subjects}</p>
                    <p><b>Total Credits:</b> {student?.credits}</p>
                    <p><b>Attendence:</b> {student?.attendence??0}</p>
                    <p><b>CGPA:</b> {student?.cgpa}</p>
                </div>

                </div>


                {/* TABLE */}

                <div className="table-section">

                    <h2>Semester Results</h2>

                    <table>

                        <thead>

                            <tr>
                                <th>Semester</th>
                                <th>CGPA</th>
                                <th>Designation</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td>Semester 1</td>
                                <td>{sem1?.cgpa||"-"}</td>
    <td>{sem1?.cgpa >= 8.9 ? "First Class with distinction" : "First Class"}</td>
                                <td>
                                    <span className="pass">
                                        Pass
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>Semester 2</td>
                                    <td>{sem2?.cgpa||"-"}</td>
    <td>{sem2?.cgpa >= 8.9 ? "First Class with distinction" : "First Class"}</td>
                           
                                <td>
                                    <span className="pass">
                                        Pass
                                    </span>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
        </>
    );
}

export default StudentDashboard;
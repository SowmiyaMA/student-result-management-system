import StudentSidebar from "../components/StudentSidebar";
import { useEffect, useState } from "react";
import {FaBookOpen, FaDownload,FaEye} from "react-icons/fa";

function Subjects()
 {
const [student, setStudent] = useState(null);
const [semester, setSemester] = useState(1);
const [subjects, setSubjects] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/student")
    .then(res => res.json())
    .then(data => setStudent(data))
    .catch(err => console.log(err));
}, []);

useEffect(() => {
  fetch(`http://localhost:5000/subjectsdetails?semester=${semester}`)
    .then(res => res.json())
    .then(data => setSubjects(data))
    .catch(err => console.log(err));
}, [semester]);

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

body{
    background:#f4f7fc;
}

.subjects-page{
    display:flex;
    min-height:100vh;
    width:100%;
}

/* MAIN */

.subjects-main{
    margin-left:260px;
    width:calc(100vw - 260px);
    min-height:100vh;
    padding:30px;
}

/* NAVBAR */

.subjects-navbar{
    background:white;
    border-radius:24px;
    padding:22px 28px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fff;
    box-shadow:0 5px 20px rgba(0,0,0,0.08);

    margin-bottom:30px;
}

.subjects-navbar h1{
    font-size:30px;
    color:#0f172a;
}

.subjects-navbar p{
    color:#64748b;
    margin-top:6px;
}

.subjects-profile{
    display:flex;
    align-items:center;
    gap:12px;
}

.subjects-profile img{
    width:50px;
    height:50px;
    border-radius:50%;
}

.subjects-profile span{
    font-weight:600;
}

/* GRID */

.subjects-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(380px,1fr));
    gap:25px;
    width:100%;
}

/* CARD */

.subject-card{
    background:white;
    border-radius:24px;
    overflow:hidden;
    height:100%;
    display:flex;
    flex-direction:column;
    box-shadow:0 5px 18px rgba(0,0,0,0.08);

    transition:0.3s;
}
  .subject-content{
    flex:1; 
    display:flex;
    flex-direction:column;
  }

.subject-card{
    transition:all .3s ease;
}

.subject-card:hover{
    transform:translateY(-5px);
    box-shadow:0 15px 35px rgba(37,99,235,.15);
}
/* TOP */

.subject-top{
    height:90px;

    display:flex;
    align-items:center;
    justify-content:center;

    color:white;
    font-size:38px;
}

/* CONTENT */

.subject-content{
    padding:24px;
}
  .semester-select{
    margin-top:12px;
    padding:10px 15px;
    border:1px solid #c6c8cb;
    border-radius:10px;
    color:black;
    background-color:#8ab3f6;
    font-size:15px;
    cursor:pointer;
}

/* HEADER */

.subject-header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;

    gap:10px;
}

.subject-header h2{
    font-size:22px;
    color:#0f172a;
    line-height:1.4;
}

/* BADGE */

.badge{
    background:#dcfce7;
    color:#16a34a;

    padding:6px 14px;
    border-radius:30px;

    font-size:12px;
    font-weight:600;
}

/* FACULTY */

.faculty{
    color:#64748b;
    margin-top:10px;
    margin-bottom:18px;
}

/* DETAILS */

.subject-details{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:12px;

    margin-bottom:20px;
}

.subject-details p{
    background:#f8fafc;
    padding:10px;
    border-radius:10px;
    font-size:14px;
}

/* ATTENDANCE */

.attendance{
    margin-bottom:22px;
}

.attendance-text{
    display:flex;
    justify-content:space-between;

    margin-bottom:8px;

    font-size:14px;
    font-weight:600;
}

.attendance-bar{
    width:100%;
    height:12px;

    background:#e2e8f0;
    border-radius:20px;

    overflow:hidden;
}

.attendance-fill{
    height:100%;
    border-radius:20px;
}

/* BUTTONS */

.subject-buttons{
    display:flex;
    gap:14px;
}

.subject-buttons button{
    flex:1;

    border:none;
    padding:13px;

    border-radius:12px;

    font-size:15px;
    font-weight:600;

    display:flex;
    justify-content:center;
    align-items:center;
    gap:8px;

    cursor:pointer;

    transition:0.3s;
}

.view-btn{
    background:#2563eb;
    color:white;
}

.download-btn{
    background:#22c55e;
    color:white;
}

.subject-buttons button:hover{
    transform:scale(1.03);
}

/* TABLET */

@media(max-width:992px){

    .subjects-main{
        margin-left:220px;
        padding:20px;
    }

    .subjects-navbar{
        padding:20px;
    }

    .subjects-navbar h1{
        font-size:24px;
    }
}

/* MOBILE */

@media(max-width:768px){

    .subjects-main{
        margin-left:95px;
        width:calc(90vw - 95px);
        padding:14px;
        
    }

    .subjects-navbar{
        flex-direction:column;
        align-items:flex-start;
        gap:18px;
        padding:18px;
        width:100%;
    }

    .subjects-navbar h1{
        font-size:22px;
    }

    .subjects-profile{
        width:100%;
        justify-content:flex-start;
    }

    .subjects-grid{
        grid-template-columns:1fr;
        width:100%;
    }

    .subject-content{
        padding:20px;
        height:50%;
    }
    .subject-header{
        flex-direction:row;
    }

    .subject-header h2{
        font-size:20px;
    }

    .subject-details{
        grid-template-columns:1fr;
    }

    .subject-buttons{
        flex-direction:column;
    }
}

/* SMALL MOBILE */

@media(max-width:480px){

    .subjects-main{
        margin-left:70px;
        padding:10px;
    }

    .subjects-navbar{
        border-radius:14px;
    }

    .subjects-navbar h1{
        font-size:18px;
    }

    .subjects-navbar p{
        font-size:13px;
    }

    .subject-content{
        padding:18px;
    }

    .subject-header h2{
        font-size:17px;
    }

    .subject-details p{
        font-size:12px;
    }

    .subject-buttons button{
        font-size:13px;
        padding:11px;
    }
}`}
    </style>
    <div className="subjects-page">


      {/* SIDEBAR */}
      <StudentSidebar />

      {/* MAIN */}

      <div className="subjects-main">

        {/* NAVBAR */}

        <div className="subjects-navbar">

          <div>
            <h1>Semester {semester} Subjects</h1>

            <p>Manage your academic subjects easily</p>

            <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="semester-select"
            >
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
            </select>

          </div>

          <div className="subjects-profile">

            <img
              src="images/New pic.jpeg"
              alt="image"
            />

            <span>{student?.name}</span>

          </div>

        </div>

        {/* SUBJECT CARDS */}

        <div className="subjects-grid">

          {subjects.map((subjectdetails, index) => (

            <div
              className="subject-card"
              key={index}
            >

              <div
                className="subject-top"
                style={{
                  background: subjectdetails.color
                }}
              >

                <FaBookOpen />

              </div>

              <div className="subject-content">

                <div className="subject-header">

                  <h2>{subjectdetails.title}</h2>

                  <span className="badge">
                    Active
                  </span>

                </div>

                <p className="faculty">
                  Faculty : <b>{subjectdetails.faculty}</b>
                </p>

                <div className="subject-details">

                  <p>
                    <b>Code :</b> {subjectdetails.code}
                  </p>

                  <p>
                    <b>Credits :</b> {subjectdetails.credits}
                  </p>

                  <p>
                    <b>Internal :</b> {subjectdetails.internal}
                  </p>

                  <p>
                    <b>Assignment :</b> {subjectdetails.assignment}
                  </p>

                </div>

                {/* ATTENDANCE */}

                <div className="attendance">

                  <div className="attendance-text">

                    <span>Attendance</span>

                    <span>
                      {subjectdetails.attendance}%
                    </span>

                  </div>

                  <div className="attendance-bar">

                    <div
                      className="attendance-fill"
                      style={{
                        width:
                          `${subjectdetails.attendance}%`,
                        background: subjectdetails.color
                      }}
                    ></div>

                  </div>

                </div>


              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
    </>
  );
}

export default Subjects;
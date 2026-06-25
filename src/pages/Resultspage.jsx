import { FaAward } from "react-icons/fa";
import StudentSidebar from "../components/StudentSidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ResultsPage() {

const [student, setStudent] = useState(null);
const [marks, setMarks] = useState([]);

const location = useLocation();
const [semester, setSemester] = useState(location.state?.semester || 2);
useEffect(() => {

  fetch("http://localhost:5000/student")
    .then(res => res.json())
    .then(data => {

      setStudent(data);

      if(semester === 1){
        setMarks(data.semester1.marks);
      }else{
        setMarks(data.semester2.marks);
      }

    });

}, [semester]);
const percentage =
marks.length > 0
? (
    marks.reduce(
      (sum,item)=>sum + item.mark,
      0
    ) / marks.length
  ).toFixed(1)
: 0;
const getGrade = (mark) => {

   if (mark >= 95) return "S";
    if (mark >= 90) return "A+";
    if (mark >= 80) return "A";
    if (mark >= 70) return "B+";
    if (mark >= 60) return "B";
    return "C";
};
    return (
        <>
        <style>
            {`*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{
    background:#eef3fb;
}

/* PAGE */

.results-page{
    display:flex;
    min-height:100vh;
}

/* MAIN */

.results-main{
    margin-left:260px;
    width:100%;
    padding:35px;
}

/* HEADER */

.results-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    gap:20px;
    margin-bottom:30px;
}

.results-header h1{
    font-size:34px;
    color:#0f172a;
    margin-bottom:8px;
}

.results-header p{
    color:#64748b;
    font-size:15px;
}
.semester-select{
    padding:12px 20px;
    border:2px solid #2563eb;
    border-radius:12px;
    font-size:15px;
    font-weight:600;
    outline:none;
    cursor:pointer;
    color:#2563eb;
    background:white;
}

.semester-badge{
    background:linear-gradient(
        135deg,
        #2563eb,
        #1d4ed8
    );

    color:white;

    padding:12px 24px;

    border-radius:40px;

    font-weight:600;

    box-shadow:0 5px 15px rgba(37,99,235,0.3);
}

/* CARD */

.results-card{
    background:white;

    border-radius:25px;

    padding:30px;

    box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

/* TABLE */

.table-wrapper{
    width:100%;
    overflow-x:auto;
}

.results-table{
    width:100%;
    border-collapse:collapse;
    min-width:1000px;
}

.results-table th{
    background:#2563eb;
    color:white;

    padding:18px;

    font-size:15px;
    font-weight:600;
}

.results-table th:first-child{
    border-top-left-radius:14px;
}

.results-table th:last-child{
    border-top-right-radius:14px;
}

.results-table td{
    padding:18px 14px;
    text-align:center;
    font-size:14px;
    border-bottom:1px solid #e2e8f0;
}

.results-table tbody tr{
    transition:0.3s;
}

.results-table tbody tr:hover{
    background:#f8fbff;
    transform:scale(1.01);
}

/* SUBJECT */

.results-table td:first-child{
    text-align:left;
    font-weight:500;
    color:#0f172a;
}

/* GRADE */

.grade{
    padding:6px 14px;
    border-radius:20px;
    font-size:13px;
    font-weight:600;
}

.grade-a{
    background:#dbeafe;
    color:#1d4ed8;
}

.grade-b{
    background:#fef3c7;
    color:#b45309;
}

.grade-aplus{
    background:#dcfce7;
    color:#15803d;
}

/* STATUS */

.status{
    padding:7px 15px;
    border-radius:20px;
    font-size:13px;
    font-weight:600;
}

.pass{
    background:#22c55e;
    color:white;
}

/* SUMMARY */

.summary-section{
    margin-top:35px;

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(220px,1fr));

    gap:20px;
}

.summary-card{
    background:#f8fafc;

    padding:25px;

    border-radius:20px;

    text-align:center;

    transition:0.3s;
}

.summary-card:hover{
    transform:translateY(-5px);
    background:#eff6ff;
}

.summary-card h3{
    color:#64748b;
    font-size:15px;
    margin-bottom:10px;
}

.summary-card p{
    font-size:30px;
    font-weight:700;
    color:#2563eb;
}

.pass-text{
    color:#16a34a !important;
}

/* TABLET */

@media(max-width:992px){

    .results-main{
        margin-left:220px;
        padding:25px;
    }

    .results-header h1{
        font-size:28px;
    }

}

/* MOBILE */

@media(max-width:768px){

    .results-main{
        margin-left:80px;
        padding:18px;
    }

    .results-header{
        flex-direction:column;
    }

    .results-header h1{
        font-size:24px;
        text-align:center;
    }
    .semester-badge{
        align-items:center;
    }

    .results-card{
        padding:18px;
        border-radius:18px;
    }

    .results-table{
        min-width:50px;
    }

    .results-table th{
        padding:12px 8px;
        font-size:12px;
    }

    .results-table td{
        padding:12px 8px;
        font-size:11px;
    }

    .grade,
    .status{
        font-size:10px;
        padding:5px 10px;
    }

    .summary-card{
        padding:20px;
    }

    .summary-card p{
        font-size:24px;
    }

}

/* EXTRA SMALL */

@media(max-width:480px){

    .results-main{
        padding:12px;
    }

    .results-header h1{
        font-size:20px;
    }

    .results-header p{
        font-size:12px;
    }

    .semester-badge{
        padding:10px 18px;
        font-size:13px;
    }

    .results-table{
        min-width:480px;
    }

    .results-table th{
        font-size:10px;
        padding:10px 6px;
    }

    .results-table td{
        font-size:9px;
        padding:10px 5px;
    }

}
            `}
        </style>

        <div className="results-page">

            {/* SIDEBAR */}

            <StudentSidebar />

            {/* MAIN CONTENT */}

            <div className="results-main">

                {/* HEADER */}

                <div className="results-header">

                    <div>
                        <h1>Semester  Results</h1>
                        <p>View your semester marks and grades</p>
                    </div>

                    <div className="semester-badge">
                        Semester {semester} Results
                    </div>
                    <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="semester-select"
                    >
                    <option value={1}>Semester 1</option>
                    <option value={2}>Semester 2</option>
                    </select>
                    
                </div>

                {/* RESULT CARD */}

                <div className="results-card">
                    <div className="table-wrapper">
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th>Grade</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                            {marks.map((item,index)=>(
                            <tr key={index}>
                            <td>{item.subject}</td>
                            <td>{item.mark}</td>
                            <td>
                            <span className="grade grade-a">
                            {getGrade(item.mark)}
                            </span>
                            </td>
                            <td>
                            <span className="status pass">
                            {item.mark >= 40 ? "PASS" : "FAIL"}
                            </span>
                            </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* SUMMARY */}

                    <div className="summary-section">
                        <div className="summary-card">
                            <h3>Overall Percentage</h3>
                            <p>{percentage}%</p>
                        </div>
                        <div className="summary-card">
                            <h3>{student?.cgpa}</h3>
                            <p>8.9</p>
                        </div>
                        <div className="summary-card">
                            <h3>Result Status</h3>
                            <p className="pass-text">{
                                marks.every(item => item.mark >= 40)
                                ? "PASS"
                                : "FAIL"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ResultsPage;
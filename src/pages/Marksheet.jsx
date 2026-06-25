import React from "react";
import StudentSidebar from "../components/StudentSidebar";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";

function Marksheet() {

const [student,setStudent] = useState(null);
const [subjects,setSubjects] = useState([]);

const location = useLocation();
const [semester, setSemester] = useState(1);
useEffect(()=>{

 fetch("http://localhost:5000/student")
 .then(res=>res.json())
 .then(data=>{

    setStudent(data);
    if (semester === 1) {
      setSubjects(data.semester1.marks);
    } else {
      setSubjects(data.semester2.marks);
    }
    });

},[semester]);

const total =
subjects.reduce(
(sum,item)=>sum+item.mark,
0
);

const percentage =
subjects.length > 0
? (total / subjects.length).toFixed(2)
: 0;

const cgpa =
(percentage / 9.5).toFixed(2);

const getGrade = (marks) => {
    if (marks >= 95) return "S";
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";

    return "C";
  };

  const downloadMarksheet = () => {
    window.print();
  };

  return (
    <>
    <StudentSidebar />
    <style>
        {`
       .marksheet-container{
            min-height:100vh;
            margin-left:500px;
            width:calc(100% - 260px);
            display:flex;
            justify-content:center;
            align-items:center;
            background:#f4f7fc;
            padding:20px;
        }

        .marksheet-card{
          background:white;
          width:100%;
          max-width:1150px;
          margin:auto;
          padding:35px;
          border-radius:20px;
          box-shadow:0 5px 20px rgba(0,0,0,0.1);
        }

        .marksheet-card h1{
          text-align:center;
          margin-bottom:25px;
          color:#2563eb;
        }

        .info{
          margin:10px 0;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:20px;
        }

        th,
        td{
          border:1px solid #ddd;
          padding:12px;
          text-align:center;
        }

        th{
          background:#2563eb;
          color:white;
        }

        .pass{
          color:green;
          font-weight:bold;
        }
        .summary{
          margin-top:20px;
          display:flex;
          justify-content:center;
          align-items:center;
          width:100%;
          gap:25px;
        }

        .summary h3{
          background:#eff6ff;
          padding:12px 20px;
          border-radius:10px;
          color:#2563eb;
          font-size:18px;
        }

        .download-section{
            display:flex;
            justify-content:center;
            margin-top:25px;
        }
        .download-btn{
          padding:14px 25px;
          border:none;
          border-radius:12px;
          background:linear-gradient(135deg,#22c55e,#16a34a);
          color:white;
          font-size:16px;
          font-weight:600;
          cursor:pointer;
          transition:0.3s;
        }

        .download-btn:hover{
          transform:translateY(-3px);
        }

       @media(max-width:768px){

          .marksheet-container{
              margin-left:70px;
              width:calc(100% - 70px);
              padding:10px;
          }
          }
          .marksheet-card{
            padding:15px;
            width:100%;
            max-width:650px;
          }

          table{
            font-size:12px;
          }

          th,
          td{
            padding:8px;
          }

          .summary{
            flex-direction:row;
            align-items:flex-start;
            margin-left:20px;
            gap:30px;
          }
            .download-btn {
            margin-left: 50px;
            padding: 10px 20px;
            font-size: 18px;
          }
}`}
    </style>
    <div className="marksheet-container">
      <div className="marksheet-card">
        <h1>SEMESTER {semester} RESULTS</h1>
        <div
  style={{
    display:"flex",
    justifyContent:"flex-end",
    marginBottom:"20px"
  }}
>
          <select
            value={semester}
            onChange={(e)=>setSemester(Number(e.target.value))}
            style={{
              padding:"10px 15px",
              borderRadius:"10px",
              border:"1px solid #2563eb",
              fontSize:"15px"
            }}
          >
            <option value={1}>Semester 1</option>
            <option value={2}>Semester 2</option>
          </select>
        </div>

        <div className="info"><b>Name:</b> {student?.name}</div>
        <div className="info"><b>Register Number:</b> {student?.regNo}</div>
        <div className="info"><b>Department:</b> {student?.department}</div>
        <div className="info"><b>Semester:</b> {semester}</div>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subject}</td>
                <td>{subject.mark}</td>
                <td>{getGrade(subject.mark)}</td>
                <td className="pass">
                  {subject.mark >= 40 ? "PASS" : "FAIL"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary">
          <h3>CGPA: {cgpa}</h3>
          <h3>Percentage: {percentage}%</h3>
        </div>

        <div className="download-section">
          <button
          className="download-btn" onClick={downloadMarksheet}>
          📄 Download Marksheet
          
        </button>
        </div>
      </div>
    </div>
    </>
  );
}


export default Marksheet;
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,ArcElement,Tooltip,Legend} from "chart.js";
import {Bar,Pie,Doughnut} from "react-chartjs-2";
import {useLocation} from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import { useEffect, useState } from "react";

/* =========================
   CHART REGISTER
========================= */

ChartJS.register(CategoryScale,LinearScale,BarElement,ArcElement,Tooltip,Legend);

function Performance() {
  const location = useLocation();
  const selectedSemester = location.state?.semester || 1;

  /* =========================
     COMMON OPTIONS
  ========================= */

  const chartOptions = {responsive: true,maintainAspectRatio: false,
    animation:false,
    resizeDelay:0,
    plugins:{
      legend:{
        position:"bottom"
      }
    }
  };

const [student, setStudent] = useState(null);
const [result, setResult] = useState(null);
const [subjects, setSubjects] = useState([]);
const [attendance, setAttendance] = useState(0);
const [assignment, setAssignment] = useState(0);
const [pass, setPass] = useState(0);
const [cgpa, setCgpa] = useState(0);
const [performance, setPerformance] = useState(null);

useEffect(() => {

    const data = JSON.parse(localStorage.getItem("student"));

    setStudent(data);

}, []);

useEffect(() => {

    const student = JSON.parse(localStorage.getItem("student"));

    const regNo = student?.regNo;

    fetch(`http://localhost:5000/performance/${regNo}/${selectedSemester}`)
      .then(res => res.json())
      .then(data => {

          setResult(data);

          setSubjects(data.marks||[]);

          setAttendance(data.attendance||0);

          setAssignment(data.assignment||0);

          setPass(data.pass||0);

          setCgpa(data.cgpa||0);

      })
      .catch(err => console.log(err));

}, [selectedSemester]);

const currentMarks = subjects;
const percentage =
subjects.length > 0
?
(
subjects.reduce((sum,item)=>sum+item.mark,0)
/ subjects.length
).toFixed(1)
:
0;


const barData = {

 labels:currentMarks.map(
  item=>item.subject
 ),
 datasets:[
  {
   label:`Semester ${selectedSemester} Marks`,

   data:currentMarks.map(
    item=>item.mark
   ),

   backgroundColor:[
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899"
   ]
  }
 ]

};

  const pieData = {
    labels: [
      "Pass",
      "Attendance",
      "Assignments"
    ],

    datasets: [
      {
        data:[
        pass,
        attendance,
        assignment
      ],

        backgroundColor: [
          "#22c55e",
          "#2563eb",
          "#f59e0b"
        ]
      }
    ]
  };
  

  /* =========================
     COMPARISON DATA
  ========================= */

  const comparisonData = {
  labels: [
    "Obtained CGPA",
    "Remaining CGPA"
  ],

  datasets: [
    {
      data:[cgpa,10 - cgpa],

      backgroundColor: [
        "#22c55e",
        "#e2e8f0"
      ],

      borderWidth: 0
    }
  ]
};
  return (
    <>
      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        max-width:100%;
        font-family:'Poppins',sans-serif;
      }

      html,body{
        overflow-x:hidden;
        width:100%;
      }
      body{
        background:#f4f7fc;
      }

      /* ================= MAIN ================= */

      .main{
        margin-left:300px;
        width:calc(100% - 280px);
        min-height:100vh;
        padding:30px;
        overflow-x:hidden;
      }

      .title-section{
        margin-bottom:30px;
      }

      .title{
        font-size:34px;
        color:#0f172a;
        margin-bottom:8px;
      }

      .subtitle{
        color:#64748b;
        font-size:15px;
      }

      /* ================= STATS ================= */

      .stats-container{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(250px,2fr));
        gap:20px;
        align-items:center;
        justify-content:center;
        width:100%;
        margin-bottom:35px;
      }

      .stat-card{
        background:white;
        padding:25px;
        margin-top:10px;
        width:30%;
        margin-left:25%;
        text-align:center;
        border-radius:20px;
        box-shadow:0 5px 15px rgba(0,0,0,0.08);
      }

      .stats-container .stat-card2{
        background:white;
        padding:25px;
        grid-template-columns:repeat(1,2fr);
        gap:10px;
        margin-top:20px;
        width:60%;
        margin-left:5%;
        border-radius:20px;
        box-shadow:0 5px 15px rgba(0,0,0,0.08);
      }
        .stats-container .stat-card2 h3{
          text-align:center;
          justify-content:center;
          color:#64748b;
          font-size:18px;
          margin-bottom:10px;
        }
        .stats-container .stat-card2 h1{
          text-align:center;
          justify-content:center;
          color:#2563eb;
          font-size:32px;
        } 
  
       .stat-card h3{
        color:#64748b;
        font-size:15px;
        margin-bottom:10px;
        text-align:center;
      }

      .stat-card h1{
        color:#2563eb;
        font-size:32px;
        text-align:center;
      }

      /* ================= CHARTS ================= */

      .chart-container{
        display:grid;
        width:100%;
        grid-template-columns:repeat(2,1fr);
        gap:30px;
      }
      .chart-container2{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:25px;
        max-width:1200px;
        width:100%;
        margin-top:30px;
      }

      .chart-box{
        background:white;
        width:100%;
        max-width:500px;
        padding:22px;
        border-radius:22px;
        overflow:hidden;
        box-shadow:0 5px 15px rgba(0,0,0,0.08);
        transition:none;
      }
        .chart-box2{
        background:white;
        padding:30px;
        border-radius:22px;
        box-shadow:0 5px 15px rgba(0,0,0,0.08);
        width:100%;
        display:flex;
        flex-direction:column;
      }
        
       .cgpa-text{
          position:absolute;
          text-align:center;
          margin-top:25px;
          font-size:28px;
          font-weight:700;
          color:#22c55e;
        }

      .chart-box h2{
        margin-bottom:20px;
        color:#0f172a;
        font-size:20px;
        text-align:center;
      }
       .chart-box2 h2{
        margin-bottom:28px;
        color:#0f172a;
        font-size:28px;
        margin-bottom:20px;
        text-align:center;
      }

      .chart-wrapper{
        position:relative;
        width:100%;
        height:320px;
        display:flex;
        justify-content:center;
        align-items:center;
      }
       .chart-wrapper2{
        width:100%;
        height:400px;
        display:flex;
        justify-content:center;
        align-items:center;
      }

      canvas{
        max-width:100% !important;
      }
      

      /* ================= TABLET ================= */

      @media(max-width:992px){

        .stats-container{
          grid-template-columns:1fr 1fr;
        }

        .chart-container{
          grid-template-columns:1fr;
        }

      }

      /* ================= MOBILE ================= */

      @media(max-width:768px){

        .main{
          margin-left:80px !important;
          width:calc(100vw - 80px)!important;
          padding:15px 10px !important;
          overflow-x:hidden;
        }

        .title{
          font-size:24px;
          text-align:center;
        }

        .subtitle{
          font-size:16px;
          text-align:center;
        }

        .stats-container{
          grid-template-columns:1fr 1fr;
          width:100%;
          gap:5px;
        }

        .stat-card{
          width:100%;
          padding:20px;
          margin-left:80px;
          border-radius:18px;
       }
        .stats-container .stat-card2{
        background:white;
        padding:25px;
        grid-template-columns:repeat(1,2fr);
        gap:10px;
        margin-top:20px;
        width:80%;
        margin-left:15%;
        border-radius:20px;
        box-shadow:0 5px 15px rgba(0,0,0,0.08);
      }

        .stat-card h1{
          font-size:24px;
        }

        .chart-container{
          grid-template-columns:1fr;
          gap:15px;
          margin-left:30px;
          width:80%;
        }
        .chart-container2{
          grid-template-columns:1fr;
          gap:15px;
          width:90%;
          height:70%;
          margin-left:15px !important;
        }

        .chart-box{
          width:100%;
          padding:14px;
          border-radius:16px;
          max-width:none;
          overflow:hidden;
        }

        .chart-container .chart-box2{
          width:100%;
          padding:14px;
          grid-template-columns:repeat(1,3fr);
          border-radius:16px;
          max-width:none;
          overflow:hidden;
        }
        .chart-box h2{
          font-size:15px;
          text-align:center;
        }

        .chart-wrapper{
          height:250px;
          width:100%;
        }
        .cgpa-text{
          font-size:20px;
        }

        canvas{
          width:100% !important;
          height:100% !important;
          display:block;
        }
      }
      @media(max-width:480px){

        .main{
          margin-left:55px;
          width:calc(100% - 55px);
          padding:8px;
        }
      }
      

      `}
      </style>

      {/* SIDEBAR */}

      <StudentSidebar />

      {/* MAIN */}

      <div className="main">

        {/* TITLE */}

        <div className="title-section">

          <h1 className="title">
            Performance Analytics
          </h1>

          <p className="subtitle">
            Student academic performance overview
          </p>

        </div>

        {/* STATS */}

        <div className="stats-container">
          {selectedSemester === 1 && (
          <div className="stat-card">
            <h3>Semester {selectedSemester} Percentage</h3>
            <h1>{percentage}%</h1>
          </div>
          )}
          {selectedSemester === 2 && (
    <>
          <div className="stat-card2">
            <h3>Semester {selectedSemester} Percentage</h3>
            <h1>{percentage}%</h1>
          </div>

          <div className="stat-card2">
            <h3>Overall CGPA</h3>
            <h1>{cgpa}</h1>
          </div>
       </>    )}
        </div>

        {/* CHARTS */}
        <div className="chart-container">

  {selectedSemester === 1 && (
    <>
      <div className="chart-box">
        <h2>Semester 1 Marks</h2>

        <div className="chart-wrapper">
          <Bar
            data={barData}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="chart-box">
        <h2>Semester 1 Performance</h2>

        <div className="chart-wrapper">
          <Pie
            data={pieData}
            options={chartOptions}
          />
        </div>
      </div>
    </>
  )}
  </div>
  <div className="chart-container2">

  {selectedSemester === 2 && (
    <>
      <div className="chart-box2">
        <h2>Semester 2 Marks</h2>

        <div className="chart-wrapper2">
          <Bar
            redraw={false}
            data={barData}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="chart-box2">
        <h2>Semester 2 Performance</h2>

        <div className="chart-wrapper2">
          <Pie
            redraw={false}
            data={pieData}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="chart-box2">
        <h2>Overall CGPA</h2>

        <div className="chart-wrapper2">

          <div className="cgpa-text">
            {cgpa} 
          </div>

          <Doughnut
            redraw={false}
            data={comparisonData}
            options={chartOptions}
          />

        </div>
      </div>
    </>
  )}

</div>
      </div>
    </>
  );

}
export default Performance;
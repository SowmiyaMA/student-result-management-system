import { FaUserGraduate, FaHouse, FaUser } from "react-icons/fa6";
import { FaBook, FaChartLine, FaFilePdf } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import { useEffect, useState } from "react";


function Profile() {

    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/student")
        .then(res => res.json())
        .then(data => setStudent(data))
        .catch(err => console.log(err));
    }, []);

    if (!student) {
    return (
        <div style={{padding:"30px"}}>
        Loading...
        </div>
    );
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

        /*body{
            background:#f4f7fc;
        }*/

        /* ================= MAIN ================= */

        .main{
            margin-left:300px;
            width:calc(100% - 300px);
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:30px;
        }

        /* ================= PROFILE CARD ================= */

        .profile-card{
            background:white;
            margin-left:250px;
            width:100%;
            max-width:500px;
            padding:35px;
            border-radius:25px;
            justify-content:center;
            align-items:center;
            text-align:center;

            box-shadow:0 5px 20px rgba(0,0,0,0.1);

            transition:0.3s;
        }

        .profile-card:hover{
            transform:translateY(-5px);
        }

        .profile-card img{
            width:130px;
            height:130px;

            border-radius:50%;
            object-fit:cover;

            margin-bottom:20px;

            border:5px solid #2563eb;
        }

        .profile-card h2{
            margin-bottom:20px;
            color:#0f172a;
        }

        .info{
            background:#f1f5f9;

            padding:14px;
            border-radius:12px;

            margin:12px 0;

            text-align:left;

            font-size:15px;
        }

        .info b{
            color:#2563eb;
        }

        /* ================= MOBILE ================= */

       @media(max-width:768px){

    .main{
        margin-left:80px;
        width:calc(100% - 80px);
        min-height:100vh;

        display:flex;
        justify-content:center;
        align-items:center;

        padding:15px;
    }

    .profile-card{
        width:100%;
        margin-left:50px;
        max-width:400px;
        padding:25px 18px;
        border-radius:18px;
    }

    .profile-card img{
        width:100px;
        height:100px;
    }

    .profile-card h2{
        font-size:22px;
    }

    .info{
        font-size:14px;
        padding:12px;
    }
}
        }

        `}</style>

        <StudentSidebar/>
 
        {/* MAIN */}

        <div className="main">

            <div className="profile-card">

                <img
                    src="images/New pic.jpeg"
                    alt="profile"
                />

               <h2>{student?.name}</h2>

                <div className="info">
                    <b>Department :</b> {student?.department}
                </div>

                <div className="info">
                    <b>Year :</b> {student?.year}
                </div>

                <div className="info">
                    <b>Semester :</b> {student?.semester}
                </div>

                <div className="info">
                   <b>Register No :</b> {student?.regNo}
                </div>

                <div className="info">
                    <b>Email :</b>{student?.email}
                </div>

                <div className="info">
                   <b>CGPA :</b> {student?.cgpa}
                </div>

            </div>

        </div>
    </>      
    );
}

export default Profile;
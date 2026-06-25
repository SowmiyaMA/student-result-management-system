
import { FaUserGraduate,FaHome,FaBook,FaPoll,FaChartLine,FaUser,FaFilePdf,FaSignOutAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function StudentSidebar() {

  const navigate = useNavigate();

  // LOGOUT FUNCTION
  function handleLogout() {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (confirmLogout) {

      alert("Logged out successfully!");

      localStorage.removeItem("student");

      navigate("/");
    }
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

body{
    background:#f1f5f9;
    display:flex;
}

/* =========================
   SIDEBAR
========================= */

.sidebar{
    width:260px;
    height:100vh;
    background:#0f172a;
    color:white;
    position:fixed;
    left:0;
    top:0;
    padding:25px 15px;
    transition:0.3s;
    overflow:hidden;
}
.navbar{
    padding:15px 20px;
}
/* LOGO */
.active-link{
    background:#2563eb;
    color:white;
    font-weight:600;
}
.menu-link.active-link{
    background:#2563eb !important;
    color:white !important;
    font-weight:600;
}

.menu-link.active-link:hover{
    background:#2563eb !important;
}
.logo{
    display:flex;
    align-items:center;
    gap:12px;
    margin-bottom:40px;
    padding-left:10px;
}

.logo i{
    font-size:30px;
    color:#e4e8e9;
}

.logo h2{
    font-size:24px;
    font-weight:600;
}

/* MENU */

.menu{
    list-style:none;
}

.menu li{
    margin:8px 0;
}

/* LINKS */

.menu-link,
.logout-btn{
    display:flex;
    align-items:center;
    gap:15px;
    color:white;
    text-decoration:none;
    padding:15px;
    border-radius:12px;
    transition:0.3s;
    width:100%;
    background:none;
    border:none;
    cursor:pointer;
    font-size:16px;
    justify-content:flex-start;
    }

    .menu-link span{
        display:inline;
        white-space:nowrap;
    }
   .menu-link svg{
        width:24px;
        min-width:24px;
        font-size:20px;
    }

/* HOVER */

.menu-link:hover,
.logout-btn:hover{
    background:#1e293b;
}

/* ICON */

.menu-link svg{
    width:30px;
    min-width:30px;
    text-align:center;
    font-size:20px;
    flex-shrink:0;
}


/* ACTIVE PAGE */

.active .menu-link{
    background:#2563eb;
}

/* =========================
   MAIN CONTENT
========================= */

.main{
    margin-left:260px;
    width:100%;
    min-height:100vh;
    padding:30px;

    transition:0.3s;
}

/* =========================
   TABLET
========================= */

@media(max-width:992px){

.sidebar{
    width:220px;
}

.main{
    margin-left:220px;
    padding:20px;
}

}

/* =========================
   MOBILE
========================= */

@media(max-width:768px){

/* SIDEBAR */

.sidebar{
    width:90px;
    padding:20px 10px;
    position:fixed;
    left:0;
    top:0;
    z-index:999;
}

/* HOVER EXPAND */

.sidebar:hover{
    width:240px;
}
    
/* MENU */
 .menu li
{ 
padding:0;
 margin:10px 0;
 border-radius:12px;
 overflow:hidden; 
} 

/* LOGO */

.logo{
    justify-content:center;
    padding-left:0;
}

.logo h2{
    display:none;
}

/* SHOW LOGO TEXT ON HOVER */

.sidebar:hover .logo{
    justify-content:flex-start;
    padding-left:10px;
}
/* TEXT */

.menu-link span{
    display:none;
    font-size:16px;
    white-space:nowrap;
}
 .sidebar:hover .menu-link span
    { 
    display:inline; }

.sidebar:hover .logo h2{
    display:block;
}
.sidebar:hover .menu li:not(:has(.menu-link))
 { justify-content:flex-start; 
  padding-left:20px; 
  }
 .sidebar:hover .menu li:not(:has(.menu-link)) span
    { 
    display:inline;
 }
 .sidebar:hover .menu-link
    {
     justify-content:flex-start;
     padding-left:20px; }


/* MENU LINKS */

.menu-link{
    justify-content:center;
}

/* ICON */

.menu-link svg{
    margin-right:0;
    font-size:20px;
}

/* TEXT HIDE */

.menu-link span{
    display:none;
}

/* SHOW TEXT ON HOVER */

.sidebar:hover .menu-link{
    justify-content:flex-start;
}

.sidebar:hover .menu-link span{
    display:inline;
}

/* MAIN */

.main{
    margin-left:90px;
    width:calc(100% - 90px);
    padding:15px;
    Transition:none;
}

}

/* =========================
   EXTRA SMALL MOBILE
========================= */

@media(max-width:480px){

.sidebar{
    width:55px;
}

.sidebar:hover{
    width:220px;
}

.main{
    margin-left:55px;
    width:calc(100% - 55px);
    padding:6px;
}

.logo svg{
    font-size:24px;
}

.menu-link{
    padding:14px 10px;
}

.menu-link svg{
    font-size:18px;
}
      }`}
    </style>

    <div className="sidebar">

      {/* LOGO */}

      <div className="logo">
        <FaUserGraduate />
        <h2>Student</h2>
      </div>

      {/* MENU */}

      <ul className="menu">

        <li>
          <NavLink to="/student-dashboard" className={({isActive})=>isActive?"menu-link active-link":"menu-link"}>
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/subjects" className={({isActive})=>isActive?"menu-link active-link":"menu-link"}>
            <FaBook />
            <span>Subjects</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/result-login" state={{ from: "sidebar" }} className={({ isActive }) => isActive ? "menu-link active-link" : "menu-link"}>
            <FaPoll />
            <span>Previous Results</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/performance"  state={{ semester: 1 }} className={({ isActive }) => isActive ? "menu-link active-link" : "menu-link"}>
            <FaChartLine />
            <span>Performance</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "menu-link active-link" : "menu-link"}>
            <FaUser />
            <span>Profile</span>
            </NavLink>
        </li>

        <li>
          <NavLink to="/result-login" state={{from:"marksheet"}} className={({ isActive }) => isActive ? "menu-link active-link" : "menu-link"}>
            <FaFilePdf />
            <span>Marksheet</span>
            </NavLink>
        </li>

        {/* LOGOUT */}

       <li>
          <a href="#" className="menu-link logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
          </a>
      </li>

      </ul>
    </div>
    </>
  );
}
export default StudentSidebar;
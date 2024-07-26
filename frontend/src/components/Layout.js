import React from "react";
import {Link} from "react-router-dom"; 
import "../index.css"; 

function Layout() {
    return (
        <nav className = "navbar">
            <div className = "header">
                <Link className = "link" to = "/">📍 Home </Link>
                <Link className = "link" to = "/doctor">🩺 Doctors </Link>  
                <Link className = "link" to = "/patient">👩‍👩‍👧‍👦 Patients </Link> 
                <Link className = "link" to = "/appointment">📆 Appointments </Link> 
            </div><br/><br/><br/>
        </nav>
    )
}

export default Layout 
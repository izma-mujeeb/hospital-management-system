import React from "react"
import "../index.css"
import {Link} from "react-router-dom"
import { useEffect } from "react"


function Home() {

    useEffect(() => {
        document.body.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/11309/11309592.png')"; 
        document.body.style.backgroundColor = "rgb(237, 189, 205)";
        document.body.style.backgroundSize = "100%";
        document.title = "Hospital Management System";
    }, [])

    return (
        <nav className = "navbar">
            <div className = "header">
                <Link className = "link" to = "/">📍 Home </Link>
                <Link className = "link" to = "/doctor">🩺 Doctors </Link> 
                <Link className = "link" to = "/patient">👩‍👩‍👧‍👦 Patients </Link> 
                <Link className = "link" to = "/appointment">📆 Appointments </Link>  
            </div><br/><br/><br/>
            <h1 className = "title"><span style = {{fontSize: "5rem", color: "palevioletred"}}>HOSPITAL</span><br/> Management System</h1> 
        </nav>
    )
}

export default Home 
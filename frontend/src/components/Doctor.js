import React from "react"
import { useEffect, useState } from "react";
import Layout from "./Layout";
import DoctorList from "./DoctorList";
import { nanoid } from 'nanoid'; 


let firstNameProp = "";
let lastNameProp = "";
let specialityProp = "";

function Doctor() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const [speciality, setSpeciality] = useState("");
    const [showDoctors, setShowDoctors] = useState(false);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        document.body.style.backgroundColor = "pink";
        document.body.style.backgroundImage = "";
        document.title = "Add a Doctor";
        getAllUsers();

    }, [])

    async function getAllUsers() {
        let result = await fetch("http://localhost:5000/getDoctors", {
            method: "GET",
        })
        result = await result.json();
        setDoctors(result);
    }

    async function handleSubmit(event) {
        event.preventDefault(); 
        let result = await fetch("http://localhost:5000/doctor", {
            method: "POST",
            body: JSON.stringify({firstName, lastName, speciality}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        localStorage.setItem("doctors", JSON.stringify(result));
        setShowDoctors(true);
        firstNameProp = firstName;
        lastNameProp = lastName;
        specialityProp = speciality;
        setFirstName("");
        setLastName("");
        setSpeciality("");
    }

    async function deleteDoctor(firstName, lastName, check) {
        let result = await fetch("http://localhost:5000/deleteDoctor", {
            method: "POST",
            body: JSON.stringify({firstName, lastName}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        localStorage.setItem("doctors", JSON.stringify(result));
        if (check) {
            setShowDoctors(false);
        }
        getAllUsers();
    }
    
    return (
        <>
        <Layout/>
        <div className = "info">
            <div className = "doctor-container">
                <form className = "doctor-form">
                <h1 className = "doctor-heading">Add New Doctors</h1><br/>
                    <input 
                        type = "text" 
                        placeholder = "First Name"
                        className = "firstName"
                        value = {firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                    />
                    <br/>
                    <input 
                        type = "text"  
                        placeholder = "Last Name"
                        className = "lastName"
                        value = {lastName}
                        onChange = {(e) => setLastName(e.target.value)}
                    />
                    <br/>
                    <input 
                        type = "text" 
                        placeholder = "Speciality"
                        className = "speciality"
                        value = {speciality}
                        onChange = {(e) => setSpeciality(e.target.value)}
                    />
                    <br/><br/>
                    <button onClick = {handleSubmit}>Add Doctor</button>
                </form>
            </div> 
            <div>
                {showDoctors && (
                    <>
                        <div className = "doctorList-container">
                            <DoctorList firstName = {firstNameProp} lastName = {lastNameProp} speciality = {specialityProp}/>
                            <button className = "doctor-delete" onClick = {() => deleteDoctor(firstNameProp, lastNameProp, true)}>Delete</button> 
                        </div>
                        <br/>
                    </>
                    )} 
                {
                    doctors.map((doctor, index) => {
                        return (
                            <>
                                <div key = {index} className = "doctorList-container">
                                    <DoctorList key = {nanoid()} firstName = {doctor.firstName} lastName = {doctor.lastName} speciality = {doctor.speciality}/>
                                    <button key = {nanoid()} className = "doctor-delete" onClick = {() => deleteDoctor(doctor.firstName, doctor.lastName, false)}>Delete</button> 
                                </div>
                                <br/>
                            </>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default Doctor;
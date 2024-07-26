import React from "react"
import { useEffect, useState } from "react";
import Layout from "./Layout";
import PatientList from "./PatientList";
import { nanoid } from 'nanoid'; 

let firstNameProp = "";
let lastNameProp = "";
let ageProp = 0;
let genderProp = "";

function Patient() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [showPatient, setShowPatient] = useState(false);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        document.body.style.backgroundColor = "#E6D4F2";
        document.body.style.backgroundImage = "";
        document.title = "Add a Patient";
        getAllUsers();
    }, [])

    async function getAllUsers() {
        let result = await fetch("http://localhost:5000/getPatients", {
            method: "GET",
        })
        result = await result.json();
        setPatients(result);
    }

    async function handleSubmit(event) {
        event.preventDefault(); 
        let result = await fetch("http://localhost:5000/patient", {
            method: "POST",
            body: JSON.stringify({firstName, lastName, age, gender}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        localStorage.setItem("patients", JSON.stringify(result));
        setShowPatient(true);
        firstNameProp = firstName;
        lastNameProp = lastName;
        ageProp = age;
        genderProp = gender;
        setFirstName("");
        setLastName("");
        setAge("");
        setGender("");
    }

    async function deletePatient(firstName, lastName, check) {
        let result = await fetch("http://localhost:5000/deletePatient", {
            method: "POST",
            body: JSON.stringify({firstName, lastName}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        localStorage.setItem("doctors", JSON.stringify(result));
        if (check) {
            setShowPatient(false);
        }
        getAllUsers();
    }

    return (
        <>
        <Layout/>
        <div className = "info">
            <div className = "patient-container">
                <form className = "patient-form">
                <h1 className = "patient-heading">Add New Patients</h1><br/>
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
                        type = "number" 
                        placeholder = "Age"
                        className = "age"
                        value = {age}
                        onChange = {(e) => setAge(e.target.value)}
                    />
                    <br/><br/> 
                    <select 
                        className = "gender"
                        onChange = {(e) => setGender(e.target.value)} 
                    >
                        <option>Gender</option>
                        <option name = "female">Female</option>
                        <option name = "male">Male</option>
                    </select>
                    <br/><br/>
                    <button onClick = {handleSubmit}>Add Patient</button>
                </form>
            </div>
            <div>
                {showPatient && (
                    <>
                        <div className = "patientList-container"> 
                            <PatientList firstName = {firstNameProp} lastName = {lastNameProp} age = {ageProp} gender = {genderProp}/>
                            <button className = "patient-delete" onClick = {() => deletePatient(firstNameProp, lastNameProp, true)}>Delete</button> 
                        </div>
                        <br/>
                    </>
                    )} 
                {
                    patients.map((patient, index) => {
                        return (
                            <>
                                <div key = {nanoid()} className = "patientList-container">
                                    <PatientList key = {nanoid()} firstName = {patient.firstName} lastName = {patient.lastName} age = {patient.age} gender = {patient.gender}/>
                                    <button key = {nanoid()} className = "patient-delete" onClick = {() => deletePatient(patient.firstName, patient.lastName, false)}>Delete</button> 
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

export default Patient 
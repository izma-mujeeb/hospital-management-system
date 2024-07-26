import {React, useEffect, useState} from "react"
import Layout from "./Layout"
import { nanoid } from 'nanoid'; 
import AppointmentList from "./AppointmentList";

let doctorProp = "";
let patientProp = "";
let timeProp = ""; 

function Appointment() {
    const [doctor, setDoctor] = useState("");
    const [getDoctors, setGetDoctors] = useState([]);
    const [patient, setPatient] = useState("");
    const [getPatients, setGetPatients] = useState([]);
    const [getAppointments, setGetAppointments] = useState([]); 
    const [showAppointment, setShowAppointment] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        document.title = "Add an Appointment";
        document.body.style.backgroundColor = "#CFE0E3";
        document.body.style.backgroundImage = "";
        getAllPatients();
        getAllDoctors();
        getAllAppointments();
    }, [])

    async function getAllPatients() {
        let result = await fetch("http://localhost:5000/getPatients", {
            method: "GET",
        })
        result = await result.json();
        setGetPatients(result);
    }

    async function getAllDoctors() {
        let result = await fetch("http://localhost:5000/getDoctors", {
            method: "GET",
        })
        result = await result.json();
        setGetDoctors(result);
    }

    async function getAllAppointments() {
        let result = await fetch("http://localhost:5000/getAppointments", {
            method: "GET",
        })
        result = await result.json();
        setGetAppointments(result);
    }

    async function deleteAppointment(doctor, patient, time, check) {
        let result = await fetch("http://localhost:5000/deleteAppointment", {
            method: "POST",
            body: JSON.stringify({doctor, patient, time}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        localStorage.setItem("appointments", JSON.stringify(result));
        if (check) {
            setShowAppointment(false);
        }
        getAllAppointments();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let result = await fetch("http://localhost:5000/appointment", {
            method: "POST",
            body: JSON.stringify({doctor, patient, time}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        localStorage.setItem("appointments", JSON.stringify(result));
        doctorProp = doctor;
        patientProp = patient;
        timeProp = time;
        setDoctor("");
        setPatient("");
        setTime("");
        setShowAppointment(true);
    }

    return (
        <>
            <Layout/>
            <div className = "info">
                <div className = "appointment-container">
                    <form className = "appointment-form">
                        <h1 className = "appointment-heading">Add an Appointment</h1>
                        <br/>
                        <br/> 
                        <select 
                            value = {doctor}
                            className = "doctor"
                            onChange = {(e) => setDoctor(e.target.value)}
                        > 
                            <option>Doctors</option>
                        {
                            getDoctors.map(doctor => {
                                return (
                                    <option key = {nanoid()}>{doctor.firstName}</option>
                                )
                            })
                        }
                        </select>
                        <br/>
                        <br/>
                        <select
                            value = {patient} 
                            className = "patient"
                            onChange = {(e) => setPatient(e.target.value)}
                        >  
                            <option>Patients</option>
                        {
                            getPatients.map(patient => {
                                return (
                                    <option key = {nanoid()}>{patient.firstName}</option>
                                )
                            })
                        }
                        </select>
                        <br/>
                        <br/>
                        <input className = "time" type = "time" onChange = {(e) => setTime(e.target.value)}/><br/><br/> 
                        <button onClick = {handleSubmit}>Add Appointment</button>
                    </form>
                </div>
                <div>
                {showAppointment && (
                    <>
                        <div className = "appointmentList-container"> 
                            <AppointmentList key = {nanoid()} num = {1} doctorName = {doctorProp} patientName = {patientProp} time = {timeProp}/> 
                            <button key = {nanoid()} className = "appointment-delete" onClick = {() => deleteAppointment(doctorProp, patientProp, timeProp, true)}>Delete</button> 
                        </div>
                        <br/>
                    </>
                    )} 
                    {
                        getAppointments.map((appointment, index) => {
                            return (
                                <>
                                    <div key = {nanoid()} className = "appointmentList-container">
                                        <AppointmentList key = {nanoid()} num = {index + 1} doctorName = {appointment.doctor} patientName = {appointment.patient} time = {appointment.time}/>
                                        <button key = {nanoid()} className = "appointment-delete" onClick = {() => deleteAppointment(appointment.doctor, appointment.patient, appointment.time, true)}>Delete</button> 
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

export default Appointment 
import React from "react";

function DoctorList({firstName, lastName, speciality}) {

    return (
        <>
            <h1 className = "doctor-name">Doctor {lastName}</h1>
            <h3 className = "doctor-info">First Name: {firstName}</h3>
            <h3 className = "doctor-info">Last Name: {lastName}</h3>
            <h3 className = "doctor-info">Speciality: {speciality}</h3><br/>
        </>
    )
}

export default DoctorList;
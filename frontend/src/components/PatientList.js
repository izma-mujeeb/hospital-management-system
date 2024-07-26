import React from "react";

function PatientList({firstName, lastName, age, gender}) {

    return (
        <>
            <h1 className = "patient-name">Patient {lastName}</h1>
            <h3 className = "patient-info">First Name: {firstName}</h3>
            <h3 className = "patient-info">Last Name: {lastName}</h3>
            <h3 className = "patient-info">Age: {age}</h3>
            <h3 className = "patient-info">Gender: {gender}</h3><br/>
        </>
    )
}

export default PatientList;
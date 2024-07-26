import React from "react";

function AppointmentList({num, doctorName, patientName, time}) {

    return (
        <>
            <h3 className = "appointment-name"> Appointment #{num}</h3>
            <h3 className = "appointment-info">Doctor: {doctorName}</h3>
            <h3 className = "appointment-info">Patient: {patientName}</h3>
            <h3 className = "appointment-info">Time: {time}</h3>
        </>
    )
}

export default AppointmentList;
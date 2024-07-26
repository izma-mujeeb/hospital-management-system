import express from "express";
import mongoose from "mongoose";
import path from "path";
import connect from "./db/connect.js";
import doctorSchema from "./models/doctor.js"
import patientSchema from "./models/patient.js"
import appointmentSchema from "./models/appointment.js"

import cors from "cors";

const app = express()
app.use(express.json()) 

app.use(cors());

app.get("/getDoctors", (req, res) => {
    doctorSchema.find()
    .then(doctor => res.json(doctor))
    .catch(error => res.json(error))
})

app.get("/getPatients", (req, res) => {
    patientSchema.find()
    .then(patient => res.json(patient))
    .catch(error => res.json(error))
})

app.get("/getAppointments", (req, res) => {
    appointmentSchema.find()
    .then(appointment => res.json(appointment))
    .catch(error => res.json(error)) 
})

app.post("/deleteDoctor", (req, res) => {
   const {firstName, lastName} = req.body;
   try {
        doctorSchema.deleteOne({firstName: firstName, lastName: lastName})
        .then(err => console.log(err))
        res.send({status: "Ok", data: "Deleted"}); 
        console.log("deleted");
   } catch (error) {
        console.log(error);
   }
})

app.post("/deletePatient", (req, res) => {
    const {firstName, lastName} = req.body;
    try {
        patientSchema.deleteOne({firstName: firstName, lastName: lastName})
        .then(err => console.log(err))
        res.send({status: "Ok", data: "Deleted"})
        console.log("deleted");
    } catch (error) {
        console.log(error);
    }
})

app.post("/deleteAppointment", (req, res) => {
    const {doctor, patient, time} = req.body;
    try {
        appointmentSchema.deleteOne({doctor: doctor, patient: patient, time: time})
        .then(err => console.log(err))
        res.send({status: "Ok", data: "deleted"}) 
    } catch (error) {
        console.log(error);
    }
})

app.post("/doctor", async (req, res) => {
    let doctor = new doctorSchema(req.body);
    let result = await doctor.save();
    res.send(result);
})

app.post("/patient", async (req, res) => {
    let patient = new patientSchema(req.body);
    let result = await patient.save();
    res.send(result);
})

app.post("/appointment", async (req, res) => {
    let appointment = new appointmentSchema(req.body);
    let result = await appointment.save();
    res.send(result);
})

app.listen(5000);
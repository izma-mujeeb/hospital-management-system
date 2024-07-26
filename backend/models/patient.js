import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
})

export default mongoose.model("patients", patientSchema); 

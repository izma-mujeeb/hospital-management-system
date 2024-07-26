import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctor: {type: String, required: true},
    patient: {type: String, required: true},
    time: {type: String, required: true}
})

export default mongoose.model("appointments", appointmentSchema)
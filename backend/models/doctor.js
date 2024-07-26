import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    speciality: {type: String, required: true},
})

export default mongoose.model("doctors", doctorSchema); 




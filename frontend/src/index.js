import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home'; 
import Appointment from './components/Appointment';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import {BrowserRouter, Routes, Route} from "react-router-dom" 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route index element = {<Home/>}></Route>
        <Route path = "appointment" element = {<Appointment/>}></Route>
        <Route path = "doctor" element = {<Doctor/>}></Route>
        <Route path = "patient" element = {<Patient/>}></Route>
      </Routes>
    </BrowserRouter>
);


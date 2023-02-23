import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

//accept the state and set state for date
export default function DatePicker({ setDate, date }) {
    


    //Display the Calendar 
    return (< Calendar className="calendar" date={date} id="calendar" onChange={(e) => { setDate(e) }}  />)
}
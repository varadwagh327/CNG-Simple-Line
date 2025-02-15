import React from "react";
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm.jsx";

const Appointment = () => {
  return (
    <>
      <Hero
        title={" Welcome to VCare CNG-Line | Your Trusted CNG Gas Provider"}
        imageUrl={"/signin.png"}
      />
      <BookingForm/>
    </>
  );
};

export default Appointment;

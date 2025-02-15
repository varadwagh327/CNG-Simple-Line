import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import CNGimages from "../components/CNGimages";

const Home = () => {
  return (
    <>
      <Hero
        title={
          " Welcome to VCare CNG-Line | Your Trusted CNG Gas Provider"
        }
      />
      <Biography />
      <CNGimages />
      <MessageForm />
    </>
  );
};

export default Home;

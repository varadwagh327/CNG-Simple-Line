import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Address from "../components/Address";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | Your Trusted CNG Gas Provider"}
        imageUrl={"/about.png"}
      />
      <Address/>
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;

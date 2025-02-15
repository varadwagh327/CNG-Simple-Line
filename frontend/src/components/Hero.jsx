import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>
            Welcome to VCare CNG-Line | Your Trusted CNG Gas
            Provider
          </h1>
          <p>
            A CNG Management System is designed to streamline the operations of
            CNG (Compressed Natural Gas) stations by managing fueling
            transactions, user roles, and station data efficiently.
          </p>
        </div>
        <div className="banner">
          <img src="/CNGimages/cng10.jpg" alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;

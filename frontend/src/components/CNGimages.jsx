import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CNG = () => {
  const CNGArray = [
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng1.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng2.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng3.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng4.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng5.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng6.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng7.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng8.jpg",
    },
    {
      name: "CNG-Line",
      imageUrl: "/CNGimages/cng9.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container CNG">
        <h2>CNG</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {CNGArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default CNG;

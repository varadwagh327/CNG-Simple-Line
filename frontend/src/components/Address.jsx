import React from "react";

const GoogleMapEmbed = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.3969971193659!2d73.98136702136775!3d19.125722542989905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd3b6e485e2d61%3A0x7f27671c20233d06!2sShevantai%20CNG%20station!5e0!3m2!1sen!2sin!4v1740503985445!5m2!1sen!2sin"
        width="1200"
        height="400"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;

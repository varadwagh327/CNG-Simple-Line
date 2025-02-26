import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component message-form">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleMessage}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <textarea
            rows={7}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
         <p className="centerOr">----- OR -----</p>
        <div className="my-2 w-1/2 lg:w-2/4  custom-button">
        <a   href="https://wa.me/message/XJGTYVWKON5LK1"
      target="_blank"
      rel="noopener noreferrer"
       type="submit" id="submitBtn" className=" inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-300">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="string"
      aria-hidden="true"
    >
      <path
        d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.2242 8.64 17.64L8.4 17.48L5.91 18.12L6.57 15.69L6.39 15.44C5.56615 14.0667 5.24627 12.4563 5.48254 10.8783C5.71882 9.30023 6.49509 7.85052 7.68895 6.75246C8.88282 5.65441 10.4147 4.97479 12.0083 4.82624C13.6019 4.67769 15.1976 5.06806 16.54 5.93999C17.5822 6.60379 18.4273 7.52756 18.9888 8.6135C19.5504 9.69944 19.8073 10.9096 19.73 12.12C19.7152 13.8981 19.0019 15.6046 17.7321 16.8644C16.4622 18.1242 14.7502 18.8245 12.972 18.825L12 18.53ZM15.91 13.83C15.6685 13.7116 14.5579 13.1703 14.3398 13.0893C14.1216 13.0082 13.9599 12.9676 13.7982 13.2104C13.6365 13.4533 13.2071 13.9541 13.0658 14.1171C12.9245 14.2801 12.7832 14.3005 12.5418 14.182C12.3003 14.0636 11.5711 13.8198 10.7085 13.0487C10.0274 12.4395 9.55674 11.6826 9.41542 11.4397C9.27409 11.1968 9.40009 11.0643 9.52075 10.9421C9.62875 10.8321 9.75942 10.6558 9.88009 10.5145C10.0008 10.3732 10.0414 10.2711 10.1224 10.1081C10.2034 9.94509 10.1628 9.80377 10.1021 9.68543C10.0414 9.56709 9.57542 8.45176 9.37275 7.96609C9.17542 7.49576 8.97409 7.56176 8.82475 7.55376C8.68342 7.54576 8.52175 7.54576 8.36009 7.54576C8.19842 7.54576 7.93942 7.60643 7.72142 7.84932C7.50342 8.09221 6.92142 8.63354 6.92142 9.74887C6.92142 10.8642 7.74542 11.9392 7.86609 12.1022C7.98675 12.2652 9.55408 14.6661 11.9315 15.6399C12.5014 15.8859 12.9478 16.0331 13.2956 16.1451C13.8736 16.3326 14.4006 16.3056 14.8146 16.2435C15.2774 16.1742 16.1923 15.6936 16.3949 15.1271C16.5976 14.5605 16.5976 14.0748 16.5369 13.9768C16.4763 13.8788 16.3146 13.8301 16.0731 13.7116L15.91 13.83Z"
        fill='currentColor'
      />
    </svg>Chat with us on WhatsApp
        </a>
        </div>
        </form>
        <img src="/Vector.png" alt="vector" />
      </div>

    </>
  );
};

export default MessageForm;

import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuBookOpen } from "react-icons/lu";
import { useState, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import React from 'react';

const GOOGLE_RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
const ServiceRequest = () => {
  const [ verify, setVerify ] = useState(false);
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ emailError, setEmailError ] = useState(false);
  const [ phone, setPhone ] = useState("");
  const [ phoneError, setPhoneError ] = useState(false);
  const [ service, setService ] = useState("");
  const [ note, setNote ] = useState("");
  const recaptchaRef = useRef(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setEmailError(false);
    setPhone("");
    setPhoneError(false);
    setService("");
    setNote("");
    setVerify(false);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleSubmit = (event) => {
    // Validate form fields here if needed
    event.preventDefault();
    if (!name || !email || !phone || !service) {
      alert("Vui lòng điền tất cả các trường.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError(true);
      return;
    }
    const phonePattern = /^\d{10}$/; // Example pattern for 10-digit phone numbers
    if (!phonePattern.test(phone)) {
      setPhoneError(true);
      return;
    }
    if (!verify) {
      alert("Vui lòng xác minh capcha.");
      return;
    }
    // Here you can handle the form submission, e.g., send data to a server
    const apiUrl = "https://stylice.onrender.com/api/v1/service"
    const formData = {
      name,
      email,
      phone,
      service,
      note
    };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Response status:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Form Data Submitted:", formData);
      console.log("Success:", data);
      // Reset form
      resetForm();
      alert("Submit thành công.");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi khi gửi dữ liệu. Vui lòng thử lại sau.");
    });
  }

  return (
    <div className="mt-20 mb-20 rounded-lg shadow-2xl flex h-fit text-black bg-white w-full sm:w-1/2 flex-col items-center justify-center">
      <form className="pt-24 pb-24 flex flex-col items-center justify-center p-4 w-full">
        <div className="flex items-center mb-2 justify-center w-full">
          <div className="relative items-start flex flex-col w-5/6">
            <FiUser className="absolute ml-3 top-6 -translate-y-1/2 text-black-800"/>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mb-1 p-2.5 pl-10 border black-100 rounded w-full"
            />
          </div>
        </div>
        <div className="flex items-center mb-2 justify-center w-full">
          <div className="relative items-start flex flex-col w-5/6">
            <MdOutlineEmail className="absolute ml-3 top-6 -translate-y-1/2 text-black-800"/>
            <input
              type="text"
              value={email}
              onFocus={() => setEmailError(false)}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-1 p-2.5 pl-10 border black-100 rounded w-full"
            />
            <span
              className={`text-red-500 text-xs ml-2 mb-2 ${emailError ? "block" : "hidden"}`}
            >
              *Địa chỉ email không hợp lệ
            </span>
          </div>
        </div>
        <div className="flex items-center mb-2 justify-center w-full">
          <div className="relative items-start flex flex-col w-5/6">
            <FiPhone className="absolute ml-3 top-6 -translate-y-1/2 text-black-800"/>
            <input
              type="text"
              value={phone}
              onFocus={() => setPhoneError(false)}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="mb-1 p-2.5 pl-10 border black-100 rounded w-full"
            />
            <span
              className={`text-red-500 text-xs ml-2 mb-2 ${phoneError ? "block" : "hidden"}`}
            >
              *Số điện thoại không hợp lệ
            </span>
          </div>
        </div>
        <div className="flex items-center mb-2 justify-center w-full">
          <div className="relative items-start flex flex-col w-5/6">
            <LuBookOpen className="absolute ml-3 top-6 -translate-y-1/2 text-black-800"/>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Service You Need"
              className="mb-1 p-2.5 pl-10 border black-100 rounded w-full"
            />
          </div>
        </div>
        <div className="flex items-center mb-2 justify-center w-full">
          <div className="relative items-start flex flex-col w-5/6">
            <FaRegEdit className="absolute ml-3 top-6 -translate-y-1/2 text-black-800"/>
            <textarea
              placeholder="Any Note For Us"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mb-1 p-2.5 pl-10 border black-100 rounded w-full h-32 min-h-[60px] max-h-[200px] resize-y"
            ></textarea>
          </div>
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          className="mb-4 w-5/6 flex items-center justify-center"
          sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
          onChange={()=> setVerify(!verify)}
          onExpired={() => setVerify(false)}
          size="normal"
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer bg-[#422A3C] text-white px-4 py-4 rounded w-5/6"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default ServiceRequest
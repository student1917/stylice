import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuBookOpen } from "react-icons/lu";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

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

  const handleSubmit = async (event) => {
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
    const formData = {
      name: name,
      email: email,
      phone: phone,
      service: service,
      note: note
    };
    console.log("Form Data Submitted:", formData);
    alert("Submit thành công.");
    // Reset form fields - reload page
    
  }

  const handleRecapcha = (value) => {
    if (value) {
      setVerify(true);
      console.log("reCAPTCHA verified:", value);
    } else {
      setVerify(false);
      console.log("reCAPTCHA not verified");
    }
  }
  return (
    <div className="mt-20 mb-20 rounded-lg shadow-2xl flex h-fit text-black bg-white w-3/4 flex-col items-center justify-center">
      <form className="pt-24 pb-24 flex flex-col items-center justify-center p-4 w-full">
        <div className="flex items-center mb-2 justify-center w-full">
          <div className="relative items-start flex flex-col w-5/6">
            <FiUser className="absolute left-1/40 top-6 transform -translate-y-1/2 text-black-800"/>
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
            <MdOutlineEmail className="absolute left-1/40 top-6 transform -translate-y-1/2 text-black-800"/>
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
            <FiPhone className="absolute left-1/40 top-6 transform -translate-y-1/2 text-black-800"/>
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
            <LuBookOpen className="absolute left-1/40 top-6 transform -translate-y-1/2 text-black-800"/>
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
            <FaRegEdit className="absolute left-1/40 top-6 transform -translate-y-1/2 text-black-800"/>
            <textarea
              placeholder="Any Note For Us"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mb-1 p-2.5 pl-10 border black-100 rounded w-full h-32 min-h-[60px] max-h-[200px] resize-y"
            ></textarea>
          </div>
        </div>
        <ReCAPTCHA
          className="mb-4 w-5/6 flex items-center justify-center"
          sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
          onChange={handleRecapcha}
        />
        <button
          onClick={handleSubmit}
          className="text-white px-4 py-4 rounded w-5/6"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default ServiceRequest
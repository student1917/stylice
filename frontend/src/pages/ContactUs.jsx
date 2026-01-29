import React from 'react';
import bannerImg from '../assets/images/contact_banner_img.jpg';
import imageShadow from '../assets/images/image-shadow.png';
import { IoHomeOutline } from 'react-icons/io5';
import ServiceRequest from '../components/ServiceRequest';

/* ===== Static data ===== */
const contactDetails = [
  {
    title: 'Visit Us',
    detail: 'Mariendalsvej 50D 2 2000 Frederiksberg.',
  },
  {
    title: 'Email Us',
    detail: 'support@servicemarket.com',
  },
  {
    title: 'Call Us',
    detail: '(+22) 123 - 4567 - 900',
  },
];

/* ===== Component ===== */
const ContactUs = () => {
  return (
    <div className="w-screen bg-white overflow-x-hidden">
      {/* ===== Banner Section ===== */}
      <section className="w-full bg-[#422A3C] flex flex-col items-center justify-center text-center text-white py-20">
        <header className="font-manrope text-xs mb-2">
          GET IN TOUCH WITH US
        </header>
        <h1 className="font-playfair max-w-xl text-4xl font-bold">
          We Are Ready To Assist You In 24x7
        </h1>
      </section>

      {/* ===== Content Section ===== */}
      <section className="w-full bg-white flex flex-col sm:flex-row items-center justify-center py-20 px-4">
        {/* Image */}
        <div className="relative shadow-xl w-60 h-80 sm:w-80 sm:h-96 sm:mr-10 mb-10 sm:mb-0">
          <img
            src={imageShadow}
            alt="shadow"
            className="hidden sm:block absolute bottom-6 left-6 w-full h-full z-0"
          />
          <img
            src={bannerImg}
            alt="contact banner"
            className="relative z-10 w-full h-full object-cover shadow-lg"
          />
        </div>

        {/* Text content */}
        <div className="w-full sm:w-[30rem] flex flex-col items-center justify-center ">
          <header className="font-manrope text-xs mb-2">
            GET IN TOUCH WITH US
          </header>

          <h3 className="font-playfair text-2xl font-bold mb-4">
            We are here to help you always...
          </h3>

          <p className="font-manrope text-base text-[#555] mb-8">
            There are many variations of passages of Lorem Ipsum available,
            but the majority have suffered alteration in some form, buying
            to many desktop publishing packages.
          </p>

          {/* Contact info */}
          <div className="flex flex-col gap-6 w-[50%] mx-auto">
            {contactDetails.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="border-2 rounded p-3 border-[#422A3C]">
                  <IoHomeOutline className="text-xl text-[#422A3C]" />
                </div>
                <div>
                  <p className="font-playfair text-xl font-semibold">
                    {item.title}
                  </p>
                  <p className="font-manrope">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Schedule Section ===== */}
      <section className="bg-[#FBF2E0] flex flex-col items-center justify-center w-full py-32 px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl">
          <span className="font-manrope text-sm mb-2 font-semibold text-[#BA7894]">
            SCHEDULE YOUR PRESENCE
          </span>

          <h3 className="font-playfair text-4xl font-bold text-[#422A3C]">
            Get in touch
          </h3>

          <p className="font-manrope text-base text-[#555555] mt-4">
            There are many variations of passages of Lorem Ipsum available,
            but the majority have suffered alteration in some form.
          </p>
        </div>

        <div className="w-full mt-16 justify-center flex">
          <ServiceRequest />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

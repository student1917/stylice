import React, { useEffect } from 'react';
import Slider from 'react-slick';
import IconBE from '../assets/images/Icon-BE.png'
import IconGS from '../assets/images/Icon-GS.png'
import IconG from '../assets/images/Icon-G.png'
import WebFont from 'webfontloader'
import ImageAU from '../assets/images/Image-AboutUs.png';
import ImageAVT from '../assets/images/Img-LeslieAlexander.png';
import VideoSpa from '../assets/videos/video-spa.mp4';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Testimonials from '../shared/Testimonials'
import Banner1 from '../assets/images/Banner-About.jpg';
import Banner2 from '../assets/images/Banner-About-2.jpg';
import Banner3 from '../assets/images/Banner-About-3.jpg';



const About = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Manrope:400,700', 'VT323'],
      },
    });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  const bannerImages = [
    Banner1,
    Banner2,
    Banner3,
  ];
  return (
    <div className="bg-white text-gray-900">
      {/* Banner Section với slideshow */}
      {/* <section className="relative" aria-label="About Us Banner">
        <Slider {...sliderSettings}>
          {bannerImages.map((image, index) => (
            <div key={index} className="h-full w-full">
              <div
                className="relative h-full text-white py-24 text-center px-4 bg-cover bg-center h-[350px] md:h-[500px] z-10"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center">
                  <p className="text-sm uppercase tracking-widest text-pink-200 bg-opacity-50 px-2 py-1 inline-block text-[#ECBFD3]">
                    Short Story About Us
                  </p>
                  <h2 className="text-4xl md:text-5xl font-semibold leading-snug mt-4 text-[#F7E5C1]">
                    The big story behind,<br />our beautyness center
                  </h2>
                  <button
                    type="button"
                    className="mt-6 px-6 py-3 bg-pink-300 hover:bg-pink-400 text-white rounded-full transition-colors duration-200 !text-[#000000] font-bold"
                    aria-label="Contact Us"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section> */}
      <section
        className="relative h-[350px] md:h-[500px]"
        aria-label="About Us Banner"
      >
        <Slider {...sliderSettings}>
          {bannerImages.map((image, index) => (
            <div key={index}>
              <div
                className="relative w-full h-[350px] md:h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
                  <p className="text-sm uppercase tracking-widest text-[#ECBFD3]">
                    Short Story About Us
                  </p>
                  <h2 className="text-4xl md:text-5xl font-semibold mt-4 text-[#F7E5C1]">
                    The big story behind,<br />our beautyness center
                  </h2>
                  <button className="font-playfair mt-6 px-6 py-3 bg-pink-300 hover:bg-pink-400 rounded-full font-bold text-black">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <p className="text-sm text-pink-500 uppercase tracking-widest mb-2">Our Values</p>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">The work values we thrive for</h3>
        <div className="space-y-10 text-left">
          {[
            {
              icon: IconBE,
              title: 'Beauty Experts',
              desc: 'The majority have suffered alteration in some form, buying to injected humour, or randomised words which desktop publishing packages.',
            },
            {
              icon: IconGS,
              title: 'Great Services',
              desc: 'The majority have suffered alteration in some form, buying to injected humour, or randomised words which desktop publishing packages.',
            },
            {
              icon: IconG,
              title: '100% Genuine',
              desc: 'The majority have suffered alteration in some form, buying to injected humour, or randomised words which desktop publishing packages.',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-6 border-b pb-6">
              <img src={item.icon} alt={item.title} className="w-12 h-12" />
              <div>
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-10 md:py-20 px-4 md:px-6 bg-[#F7E5C1] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto h-auto md:h-[580px] relative flex flex-col md:flex-row items-center md:items-stretch rounded-xl overflow-hidden gap-6 md:gap-0">
          <div className="relative flex items-center justify-center md:justify-start md:h-full z-10">
            <div className="hidden md:block w-[180px] h-[300px] bg-[#412B3A] "></div>
            <img
              src={ImageAU}
              alt="About Us"
              className="h-[400px] md:h-full w-auto object-cover md:-ml-[60px] z-20 "
            />
          </div>
          <div className="flex flex-col justify-center md:h-full z-20">
            <div className="w-full md:w-[653px] bg-[#412B3A] text-white p-6 md:p-[56px] pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] shadow-lg space-y-[10px] ">
              <p className="text-sm uppercase tracking-widest text-white">
                ABOUT US
              </p>
              <h3 className="text-xl md:text-3xl font-bold leading-snug">
                It's the bridge between<br />
                service companies<br />
                and consumers.
              </h3>
              <p className="text-base md:text-lg leading-relaxed">
                ServiceMarket.dk is a Copenhagen-based technology company known for our overview platform. Our aim is to simplify and improve everyday life for citizens in Denmark. One platform that brings together all services in an easy and controlled environment.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Section with video and content */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="w-full md:w-1/2">
            <p className="text-sm text-pink-600 uppercase tracking-widest mb-2">
              What includes?
            </p>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#412B3A]">
              The start of the journey
            </h3>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              ServiceMarket.dk was founded in 2021 by two young entrepreneurs who saw a problem
              with the fragmented service industry in Denmark. There were thousands of small
              businesses offering services, but it was difficult for consumers to find them and
              know which ones to choose...
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'The Assessment Stage',
                  desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal letters.',
                },
                {
                  title: 'The Initialisation Stage',
                  desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal letters.',
                },
                {
                  title: 'The Treatment Stage',
                  desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal letters.',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-pink-600 mt-1 text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-[#412B3A]">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video */}
          <div className="w-full md:w-1/2">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            >
              <source src={VideoSpa} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
      <Testimonials />


    </div >
  );
};

export default About;

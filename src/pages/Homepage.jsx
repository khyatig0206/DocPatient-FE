import React from 'react';
import TypingEffect from 'react-typing-effect';
import homeSvg from '/home1.svg';
import BlogCard from '../components/BlogCard'


const Homepage = () => {
  return (
    <>
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 mt-4">
      <div className="text-center w-full lg:w-1/2 sm:items-centre p-8">
      {/* <ProfileModal isHovering={true} /> */}
        <h2 className="md:text-8xl sm:text-6xl font-bold text-textcolor maintext mb-4">Welcome to Medi</h2>
        <TypingEffect
          text={["Your trusted health companion."]}
          speed={150}
          eraseSpeed={100}
          eraseDelay={2000}
          typingDelay={500}
          className="md:text-lg sm:text-sm text-gray-600 mb-6"
        /><div>
        <button className="bg-mycolor text-white md:text-lg sm:text-sm px-4 py-2 rounded mt-4 hover:bg-buttoncolor2 transition-transform transform hover:scale-95">
          Book Your Appointment 
        </button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 mt-8 mb-3">
        <img src={homeSvg} alt="Home illustration" className="w-full h-auto border-bottom" />
      </div>
    </div>
    <BlogCard/>
    </>
  );
};

export default Homepage;

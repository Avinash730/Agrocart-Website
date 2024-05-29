import React from "react";
import { Link, NavLink } from "react-router-dom";
import { company, contact, legal, social } from "../../data/Data";
import logo from "../../assets/favicon.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="z-50 py-10 flex justify-center items-center flex-col bg-[#1e1e1e] shadow-lg text-white">
      <div className="w-[90%] lg:w-[85%] lg:text-[14px] gap-5 lg:gap-10 flex flex-col lg:flex-row">
        <div className="w-[400px] flex flex-col space-y-4">
          <NavLink to="/" className="flex items-center space-x-2">
            <img className="h-10 w-10" src={logo} alt="Your Company" />

            <h1 className="font-extrabold font-serif flex flex-col text-xl">
              अपनी फसल{" "}
              <span className=" text-emerald-500 ml-6 -mt-1.5">
                अपनी सुरक्षा
              </span>
            </h1>
          </NavLink>
          <p className="">
            © {currentYear} <span>अपनी फसल अपनी सुरक्षा</span> | सर्वाधिकार
            सुरक्षित।
          </p>
        </div>
        <div className="w-60 lg:border-l border-gray-600 lg:pl-12">
          <h1 className=" text-emerald-500">बारे में</h1>
          {company.map(({ to, title }) => (
            <NavLink to={to} key={title} className="my-2 flex ">
              {title}
            </NavLink>
          ))}
        </div>
        <div className="w-60 lg:border-l border-gray-600 lg:pl-12">
          <h1 className=" text-emerald-500">संपर्क करें</h1>
          {contact.map(({ to, title }) => (
            <NavLink to={to} key={title} className="my-2 flex ">
              {title}
            </NavLink>
          ))}
        </div>
        <div className="w-60 lg:border-l border-gray-600 lg:pl-12">
          <h1 className=" text-emerald-500">कानूनी</h1>
          {legal.map(({ to, id, title }) => (
            <NavLink to={to} key={id} id={id} className="my-2 flex">
              {title}
            </NavLink>
          ))}
        </div>
        <div className="w-60 lg:border-l border-gray-600 lg:pl-12">
          <h1 className="text-emerald-500">हमारे साथ जुड़ें</h1>
          <div className="flex my-2 lg:mt-5 lg:gap-5 gap-10">

          {social.map((s) => (
            <Link to={s.to} key={s.id} target="_blank" className="text-[20px] ">
              {s.title}
            </Link>
          ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

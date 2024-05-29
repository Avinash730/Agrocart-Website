import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMiniBars2 } from "react-icons/hi2";
import { links } from "../../data/Data";
import logo from "../../assets/favicon.png";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

function Header() {
  const [nav, setNav] = useState(false);
  const [auth, setAuth] = useAuth();
  // console.log(auth?.user?.role === 1);
  // console.log(auth?.user?.name);
  //handle logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    window.location = "/";
  };

  return (
    <>
      <div className="w-full bg-emerald-500 h-12 flex justify-end gap-6 px-6 lg:px-20 items-center text-white">
        <div id="google_translate_element" className="translate "></div>

        {!auth?.user ? (
          <>
            <NavLink
              to={"/sign-in"}
              className="py-1.5 rounded-md cursor-pointer
             hover:text-gray-200 hover:scale-105 duration-200 "
            >
              साइन इन
            </NavLink>
          </>
        ) : (
          <>
            <button
              className="py-1.5 rounded-md cursor-pointer
             hover:text-gray-200 hover:scale-105 duration-200 "
              onClick={handleLogout}
            >
              लॉग आउट
            </button>
            {auth?.user ? (
              <NavLink
                to={`/dashboard/${
                  auth?.user?.role === 1 ? "admin" : "community"
                }`}
                onClick={() => setNav(!nav)}
                className="py-1.5 rounded-md cursor-pointer
             hover:text-gray-200 hover:scale-105 duration-200"
              >
                {auth?.user?.role === 1 ? "डैशबोर्ड" : "परामर्श"}
              </NavLink>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <header className="w-full mx-auto px-5 border-b lg:px-20 h-20 bg-white flex justify-between items-center">
        {/* desktop  */}
        <NavLink to="/">
          <div className="flex items-center space-x-2">
            <img className="h-12 w-12" src={logo} alt="Your Company" />
            <h1 className="font-extrabold font-serif flex flex-col text-xl">
              अपनी फसल{" "}
              <span className=" text-emerald-500 ml-6 -mt-1.5">
                अपनी सुरक्षा
              </span>
            </h1>
          </div>
        </NavLink>
        <div className=" items-center hidden gap-8 md:flex">
          {links.map(({ link, id, title, target }) => (
            <NavLink
              to={link}
              key={id}
              target={target}
              className="py-1.5 rounded-md cursor-pointer
             hover:text-gray-600 hover:scale-105 duration-200 "
            >
              {title}
            </NavLink>
          ))}
        </div>

        {/* mobile  */}
        <div
          onClick={() => {
            setNav(!nav);
          }}
          className="cursor-pointer border border-emerald-500 shadow-sm rounded-md py-1  px-2 text-emerald-500 hover:text-black block md:hidden"
        >
          {nav ? "" : <HiMiniBars2 size={28} />}

          {nav && (
            <div
              className={
                nav
                  ? "fixed flex flex-col py-12 gap-6 top-0 right-0 w-[80%] h-full bg-white text-emerald-500 z-10 ease-in-out duration-600"
                  : "ease-in-out duration-600 fixed left-0 "
              }
            >
              {links.map(({ icon, link, title, index }) => (
                <NavLink
                  key={index}
                  onClick={() => setNav(!nav)}
                  to={link}
                  smooth
                  duration={600}
                  className="flex items-center mx-5 p-3 border rounded-md font-medium shadow-sm bg-gray-50 gap-4 text-black hover:text-emerald-500"
                >
                  <span className="pl-4 text-emerald-500">{icon}</span>
                  {title}
                </NavLink>
              ))}
              <div className="flex items-center mx-5 p-3 border rounded-md font-medium shadow-sm bg-gray-50 gap-4 text-black hover:text-emerald-500">
                <span className="pl-4 text-emerald-500">
                  <MdClose size={24} />
                </span>
                बंद करे
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;

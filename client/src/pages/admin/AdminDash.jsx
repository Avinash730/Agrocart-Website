import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

export default function AdminDash() {
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
      <div className="w-[100%] flex flex-col p-5 lg:px-10 h-screen mx-auto md:justify-between">
        <div className="flex flex-col ">
          <div className="flex justify-between">
            <h1 className="text-xl text-emerald-500 font-bold mb-4 border-b-4 w-fit">
              Admin Dashboard
            </h1>
            <div className="flex gap-4">
              <NavLink
                to="/"
                className="text-xl text-emerald-500 font-bold mb-4 border-b-4 w-fit"
              >
                Home
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-xl text-emerald-500 font-bold mb-4 border-b-4 w-fit"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 mb-10 gap-4">
            <NavLink
              to={"/dashboard/admin/createCategory"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              Different Seasons
            </NavLink>
            <NavLink
              to={"/dashboard/admin/createCrop"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Create Crops
            </NavLink>
            <NavLink
              to={"/dashboard/admin/crops"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              All Crops
            </NavLink>
            <NavLink
               to={"/dashboard/admin/news"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Create News
            </NavLink>
            <NavLink
               to={"/dashboard/admin/organicFerti"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Organic Fertilizer
            </NavLink>
            <NavLink
               to={"/dashboard/admin/greenhouse"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Greenhouse
            </NavLink>
            <NavLink
               to={"/dashboard/admin/stubble"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Stubble
            </NavLink>
            <NavLink
               to={"/dashboard/admin/seed-store"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Seed
            </NavLink>
            <NavLink
               to={"/dashboard/admin/soil-testing"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Soil testing
            </NavLink>
            <NavLink
               to={"/dashboard/admin/advance-eqp"}
              className="border h-32 flex items-center justify-center rounded-md bg-gray-50 hover:shadow-md hover:border-0"
            >
              {" "}
              Advance Equipments
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="w-[100%] hidden lg:flex flex-col h-full overflow-auto">
      <NavLink
        to={"/dashboard/admin"}
        className="text-xl text-emerald-500 font-bold mb-4 border-b-4 w-fit"
      >
        Admin Dashboard
      </NavLink>
      <div className="flex flex-col gap-4">
        <NavLink
          to={"/dashboard/admin/createCategory"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          Different Seasons
        </NavLink>
        <NavLink
          to={"/dashboard/admin/createCrop"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Create Crops
        </NavLink>
        <NavLink
          to={"/dashboard/admin/crops"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          All Crops
        </NavLink>
        <NavLink
          to={"/dashboard/admin/news"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Create news
        </NavLink>
        <NavLink
          to={"/dashboard/admin/organicFerti"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Organic Fertilizer
        </NavLink>
        <NavLink
          to={"/dashboard/admin/greenhouse"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Greenhouse
        </NavLink>
        <NavLink
          to={"/dashboard/admin/stubble"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Stubble
        </NavLink>
        <NavLink
          to={"/dashboard/admin/seed-store"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Seed
        </NavLink>
        <NavLink
          to={"/dashboard/admin/soil-testing"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Soil testing
        </NavLink>
        <NavLink
          to={"/dashboard/admin/advance-eqp"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          {" "}
          Advance Equipments
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;

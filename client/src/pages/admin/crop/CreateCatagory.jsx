import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import CataegoryForm from "../../../components/CataegoryForm";
import AdminMenu from "../../../components/AdminMenu";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CreateCatagory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong ${data.message}`);
    }
  };
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
        console.log(categories._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  //delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <>
      <div className="w-[100%] flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
        <div className="lg:w-1/6 w-full ">
          <AdminMenu />
        </div>
        <div className="w-full flex flex-col lg:w-5/6">
          <div className="flex gap-3 items-center">
            <Link to="/dashboard/admin">
              <IoMdArrowRoundBack size={22} />
            </Link>
            <h2 className="text-xl text-emerald-500 font-bold border-b-4 w-fit">
              Add crop category
            </h2>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="mt-4">
              <CataegoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                actions="Add Category"
              />
            </div>
          </div>
          <div className="border mt-5 lg:h-[100vh] overflow-auto rounded-md">
            <table className="w-[100%] mb-2 text-[14px]">
              <thead className=" font-medium rounded-md bg-gray-50 border-b">
                <tr className="flex justify-between">
                  <th className="px-6 py-4">Category name</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.name}
                    className="flex justify-between border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4"> {cat.name} </td>
                    <td className="flex space-x-2 px-4 py-4">
                      <button
                        title="Delete"
                        onClick={() => {
                          window.confirm("Are you sure to delete?") &&
                            handleDelete(cat._id);
                        }}
                        className="hover:text-red-400"
                      >
                        <MdOutlineDelete size={24} />
                      </button>
                      <button
                        title="Edit"
                        className="hover:text-emerald-400"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(cat.name);
                          setSelected(cat);
                        }}
                      >
                        <MdOutlineEdit size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CataegoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
            actions="Update"
          />
        </Modal>
      </div>
    </>
  );
};

export default CreateCatagory;

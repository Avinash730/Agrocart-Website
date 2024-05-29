import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/AdminMenu";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function OrganicFertiAdmin() {
  const [fertilizers, setFertilizers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  //   get all fertilizer step
  const getAllOrganicFerti = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/organicFerti/get-organicFerti"
      );
      if (data.success) {
        setFertilizers(data.ferti);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching organic fertilizers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrganicFerti();
  }, []);

  //   create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var { data } = await axios.post(
        "http://localhost:8080/api/v1/organicFerti/create-organicFerti",
        { name, description }
      );
      if (data.success) {
        toast.success(data.message);
        getAllOrganicFerti();
        setName("");
        setDescription("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong ${data.message}`);
    }
  };

  //   delete
  const handleDelete = async (fid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/organicFerti/delete-organicFerti/${fid}`
      );
      if (data.success) {
        toast.success(`organic ferti is deleted`);
        getAllOrganicFerti(); // Refresh the list after deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting category");
    }
  };

  return (
    <>
      <div className="w-[100%] flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
        <div className="lg:w-1/6 w-full">
          <AdminMenu />
        </div>
        <div className="w-full flex flex-col h-full overflow-auto lg:w-5/6">
          <div className="flex gap-3 items-center">
            <Link to="/dashboard/admin">
              <IoMdArrowRoundBack size={22} />
            </Link>
            <h2 className="text-xl text-emerald-500 font-bold border-b-4 w-fit">
              Create Organic fertilizer Step
            </h2>
          </div>
          {/* form */}
          <div className="flex flex-col space-y-2">
            <form className="mt-4 flex flex-col gap-4">
              <input
                type="text"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                placeholder="Enter step"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                name=""
                id=""
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 resize-none"
              ></textarea>

              <button
                className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2  font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 "
                onClick={handleSubmit}
              >
                Create organic fertilizer step
              </button>
            </form>
          </div>
          <div className="border mt-5 rounded-md">
            <table className="w-[100%] mb-2 text-[14px]">
              <thead className="font-medium rounded-md bg-gray-50 border-b">
                <tr className="flex justify-between">
                  <th className="px-6 py-4">Step</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  fertilizers.map((f) => (
                    <tr
                      key={f._id}
                      className="flex justify-between border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{f.name}</td>
                      <td className="px-6 py-4">{f.description}</td>
                      <td className="flex space-x-2 px-4 py-4">
                        <button
                          title="Delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this category?"
                              )
                            ) {
                              handleDelete(f._id);
                            }
                          }}
                          className="hover:text-red-400"
                        >
                          <MdOutlineDelete size={24} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/AdminMenu";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AdvEqpAdmin() {
  const [advanceEqp, setAdvanceEqp] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // get
  const getAllAdvanceEqp = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/advanceEqp/get-advanceEqp"
      );
      const data = response.data;

      if (data && data.success) {
        setAdvanceEqp(data.AdvanceEqp); // Assuming the key is 'AdvanceEqp'
      } else {
        toast.error("Failed to fetch advanceEqp data");
      }
    } catch (error) {
      console.error("Error fetching advanceEqp data:", error);
      toast.error("Something went wrong while fetching advanceEqp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAdvanceEqp();
  }, []);

  // create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/advanceEqp/create-advanceEqp",
        { name, descriptions } // Send name and descriptions array to backend
      );
      if (data.success) {
        toast.success(data.message);
        getAllAdvanceEqp();
        setName("");
        setDescriptions([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  // delete
  const handleDelete = async (aid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/advanceEqp/delete-advanceEqp/${aid}`
      );
      if (data.success) {
        toast.success(`stubble is deleted`);
        getAllAdvanceEqp();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting advanceEqp");
    }
  };

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const updateDescription = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  const removeDescription = (index) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions.splice(index, 1);
    setDescriptions(updatedDescriptions);
  };

  return (
    <>
      <div className="w-[100%] flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
        <div className="lg:w-1/6 w-full">
          <AdminMenu />
        </div>
        <div className="w-full flex h-full overflow-auto flex-col lg:w-5/6">
          <div className="flex gap-3 items-center">
            <Link to="/dashboard/admin">
              <IoMdArrowRoundBack size={22} />
            </Link>
            <h2 className="text-xl text-emerald-500 font-bold border-b-4 w-fit">
              Create advance equipment
            </h2>
          </div>
          <div className="flex flex-col space-y-2">
            <form className="mt-4 flex flex-col gap-4">
              <input
                type="text"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
                placeholder="Enter step"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {descriptions.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    rows="3"
                    value={desc}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    placeholder="Enter description"
                    className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 resize-none"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => removeDescription(index)}
                    className="p-2 h-fit bg-red-500 text-white rounded-md"
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              ))}

              <div className="flex flex-col lg:flex-row gap-4">
                <button
                  type="button"
                  onClick={addDescription}
                  className="flex justify-center lg:w-fit rounded-md bg-emerald-500 py-3 lg:py-2 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                >
                  Add description
                </button>

                <button
                  className="flex justify-center lg:w-fit rounded-md bg-emerald-500 py-3 lg:py-2 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                  onClick={handleSubmit}
                >
                  Create advance equipment
                </button>
              </div>
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
                  advanceEqp.map((s) => (
                    <tr
                      key={s._id}
                      className="flex justify-between border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{s.name}</td>
                      {/* Map over descriptions array */}
                      <td className="px-6 py-4">
                        {s.descriptions.map((description, descIndex) => (
                          <p
                            key={descIndex}
                            className="flex flex-col gap-2 mt-2"
                          >
                            {description}
                          </p>
                        ))}
                      </td>
                      <td className="flex space-x-2 px-4 py-4">
                        <button
                          title="Delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this category?"
                              )
                            ) {
                              handleDelete(s._id);
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/AdminMenu";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all news articles
  const getAllNews = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/news/get-news"
      );
      if (data.success) {
        setNews(data.news);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Something went wrong while fetching news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/news/create-news",
        {
          name,
          pic,
          description,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllNews(); // Refresh news list after creating
        setName("");
        setPic("");
        setDescription("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("Something went wrong while creating news");
    }
  };

  const handleDelete = async (nid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/news/delete-news/${nid}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllNews(); // Refresh news list after deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Something went wrong while deleting news");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 overflow-auto lg:flex-row p-5 lg:px-10 h-screen">
      <div className="lg:w-1/6 w-full">
        <AdminMenu />
      </div>
      <div className="w-full flex flex-col h-full overflow-auto lg:w-5/6">
      <div className="flex gap-3 items-center">
            <Link to="/dashboard/admin">
              <IoMdArrowRoundBack size={22} />
            </Link>
            <h2 className="text-xl text-emerald-500 font-bold border-b-4 w-fit">
              Create News
            </h2>
          </div>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
            placeholder="Enter link"
            value={pic}
            onChange={(e) => setPic(e.target.value)}
          />
          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 resize-none"
          ></textarea>
          <button
            type="submit"
            className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
          >
            Create News
          </button>
        </form>
        <div className="border mt-5 rounded-md">
          <table className="w-full mb-2 text-[14px]">
            <thead className="font-medium rounded-md bg-gray-50 border-b">
              <tr className="flex justify-between">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Link</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                news.map((n) => (
                  <tr
                    key={n._id}
                    className="flex justify-between border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{n.name}</td>
                    <td className="px-6 py-4">{n.pic}</td>
                    <td className="px-6 py-4">{n.description}</td>
                    <td className="flex space-x-2 px-4 py-4">
                      <button
                        title="Delete"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this news?"
                            )
                          ) {
                            handleDelete(n._id);
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
  );
}

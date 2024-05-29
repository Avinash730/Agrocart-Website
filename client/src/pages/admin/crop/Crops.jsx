import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../../components/AdminMenu";
import { IoMdArrowRoundBack } from "react-icons/io";

const Crops = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/crops/get-crop");
      setProducts(data.getCrops);
    } catch (error) {
      console.error("Error fetching crops:", error);
      toast.error("Something went wrong while fetching crops");
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
      <div className="lg:w-1/6 w-full">
        <AdminMenu />
      </div>
      <div className="w-full lg:h-full overflow-auto lg:w-5/6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/admin">
            <IoMdArrowRoundBack size={22} />
          </Link>
          <h2 className="text-xl text-emerald-500 font-bold border-b-4">All Crops</h2>
        </div>
        <div className="w-full overflow-x-auto mt-4">
          <table className="w-full text-sm text-left divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="divide-y hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">
                    {product.description.map((desc, index) => (
                      <div key={index}>{desc.title}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    {product.description.map((desc, index) => (
                      <div key={index}>{desc.content}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/admin/crops/updateCrop/${product.slug}`} className="text-emerald-600 hover:text-emerald-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Crops;

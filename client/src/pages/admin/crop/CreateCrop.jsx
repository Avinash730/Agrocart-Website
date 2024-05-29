// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
// import toast from "react-hot-toast";
// import AdminMenu from "../../../components/AdminMenu";
// import { IoMdArrowRoundBack } from "react-icons/io";

// const CreateCrop = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");

//   const [category, setCategory] = useState("");
//   const navigate = useNavigate();
//   // SOME METHODS FOR DYNAMIC
//   const [description, setDescription] = useState([]);

//   function handleChange(e, i) {
//     const { name, value } = e.target;
//     const prevData = [...description];
//     prevData[i][name] = [value];
//     setDescription(prevData);
//   }
//   function handleClick() {
//     setDescription([...description, { fname: "", lname: "" }]);
//   }
//   function handleDelete(i) {
//     const getData = [...description];
//     getData.splice(i, 1);
//     setDescription(getData);
//   }
//   //get all categories
//   //get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8080/api/v1/category/get-category"
//       );
//       if (data?.success) {
//         setCategories(data?.category);
//         console.log(categories?._id);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong in getting category");
//     }
//   };
//   useEffect(() => {
//     getAllCategory();
//   }, []);
//   //handle Create
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8080/api/v1/crops/create-crop",
//         { name, category, description }
//         // productData
//       );
//       if (data?.success) {
//         toast.success("Crop created successfully");
//         navigate("/dashboard/admin/crops");
//       } else {
//         toast.error("not able to create product");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   };

//   return (
//     <>
//       <div className="w-[100%] flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
//         <div className="lg:w-1/6 w-full ">
//           <AdminMenu />
//         </div>
//         <div className="w-full lg:w-5/6 lg:h-[100%] overflow-auto">
//           <div className="flex gap-3 items-center">
//             <Link to="/dashboard/admin">
//               <IoMdArrowRoundBack size={22} />
//             </Link>
//             <h2 className="text-xl text-emerald-500 font-bold border-b-4 w-fit">
//               Add Crop
//             </h2>
//           </div>
//           <div className="w-75">
//             {/* select categories  */}
//             <select
//               id="select"
//               name="category"
//               className="block w-full rounded-md border p-2  text-gray-900 shadow-sm placeholder:text-gray-400 "
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option>--select product--</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>

//             <div className="my-3">
//               <input
//                 type="text"
//                 value={name}
//                 placeholder="Enter name"
//                 className="block w-full rounded-md border p-2  text-gray-900 shadow-sm placeholder:text-gray-400 "
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <button
//                 onClick={handleClick}
//                 className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2  font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 "
//               >
//                 Add description
//               </button>
//               {description.map((val, i) => {
//                 return (
//                   <div className="flex flex-col space-y-4 mt-4">
//                     <input
//                       name="fname"
//                       value={val.fname}
//                       placeholder="write a description"
//                       className="block w-full rounded-md border py-3 px-2  text-gray-900 shadow-sm placeholder:text-gray-400 "
//                       onChange={(e) => handleChange(e, i)}
//                     />
//                     <input
//                       name="lname"
//                       value={val.lname}
//                       placeholder="write a description"
//                       className="block w-full rounded-md border py-3 px-2  text-gray-900 shadow-sm placeholder:text-gray-400 "
//                       onChange={(e) => handleChange(e, i)}
//                     />
//                     {JSON.stringify(i)}
//                     <button
//                       onClick={handleDelete}
//                       className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2  font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 "
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mt-3">
//               <button
//                 className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2  font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 "
//                 onClick={handleCreate}
//               >
//                 Create Crop
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateCrop;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../../components/AdminMenu";
import { IoMdArrowRoundBack } from "react-icons/io";

const CreateCrop = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState([]);

  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/crops/create-crop",
        {
          name,
          category,
          description,
        }
      );
      if (data?.success) {
        toast.success("Crop created successfully");
        navigate("/dashboard/admin/crops");
      } else {
        toast.error("Failed to create crop");
      }
    } catch (error) {
      console.error("Error creating crop:", error);
      toast.error("Something went wrong while creating crop");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDescription = [...description];
    updatedDescription[index] = { ...updatedDescription[index], [name]: value };
    setDescription(updatedDescription);
  };

  const handleAddDescription = () => {
    setDescription([...description, { title: "", content: "" }]);
  };

  const handleDeleteDescription = (index) => {
    const updatedDescription = [...description];
    updatedDescription.splice(index, 1);
    setDescription(updatedDescription);
  };

  return (
    <div className="w-full flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
      <div className="lg:w-1/6 w-full">
        <AdminMenu />
      </div>
      <div className="w-full lg:w-5/6 lg:h-[100%] overflow-auto">
        <div className="flex gap-3 items-center">
          <Link to="/dashboard/admin">
            <IoMdArrowRoundBack size={22} />
          </Link>
          <h2 className="text-xl text-emerald-500 font-bold border-b-4 w-fit">
            Add Crop
          </h2>
        </div>
        <div className="mt-4" >
          <select
            name="category"
            className="block w-full rounded-md border p-2 text-gray-900 shadow-sm placeholder:text-gray-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>-- Select category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="my-3">
            <input
              type="text"
              value={name}
              placeholder="Enter crop name"
              className="block w-full rounded-md border p-2 text-gray-900 shadow-sm placeholder:text-gray-400"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleAddDescription}
              className="flex justify-center rounded-md bg-emerald-500 py-3 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
            >
              Add Description
            </button>
            {description.map((desc, i) => (
              <div key={i} className="flex flex-col space-y-4 mt-4">
                <input
                  name="title"
                  value={desc.title}
                  placeholder="Title"
                  className="block w-full rounded-md border py-3 px-2 text-gray-900 shadow-sm placeholder:text-gray-400"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <textarea
                  name="content"
                  value={desc.content}
                  placeholder="Description"
                  className="block w-full rounded-md border py-3 px-2 text-gray-900 shadow-sm placeholder:text-gray-400"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <button
                  onClick={() => handleDeleteDescription(i)}
                  className="flex justify-center rounded-md bg-emerald-500 py-3 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button
              onClick={handleCreate}
              className="flex justify-center rounded-md bg-emerald-500 py-3 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
            >
              Create Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCrop;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// import axios from "axios";
// import toast from "react-hot-toast";
// import { Select } from "antd";
// import AdminMenu from "../../../components/AdminMenu";
// import { IoMdArrowRoundBack } from "react-icons/io";

// const { Option } = Select;
// const UpdateCrop = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");

//   const [category, setCategory] = useState("");

//   const [id, setId] = useState("");
//   const navigate = useNavigate();
//   const params = useParams();
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
//   //get single product
//   const getSingleProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8080/api/v1/crops/get-crop/${params.slug}`
//       );
//       setName(data.product.name);
//       setId(data.product._id);
//       console.log(id);
//       setDescription(data.product.description);

//       setCategory(data.product.category._id);
//     } catch (error) {
//       console.log(error);
//       toast.error("cannot get");
//     }
//   };
//   //useEffect to get the single categories
//   useEffect(() => {
//     getSingleProduct();
//   }, []);
//   //get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8080/api/v1/category/get-category/"
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
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       // const productData= new FormData();//to get the form data
//       // productData.append("name",name);
//       // productData.append("description",JSON.stringify(description));
//       // productData.append('category',category)
//       const { data } = await axios.put(
//         `http://localhost:8080/api/v1/crops/update-crop/${id}`,
//         { name, description, category }
//       );
//       if (data?.success) {
//         toast.success("Product updated  successfully");
//         navigate("/dashboard/admin/crops");
//       } else {
//         toast.error("not able to create product");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   };
//   //handle delete button
//   const handleDelete2 = async () => {
//     try {
//       let answer = window.prompt(
//         "Are you seriously want to delete the products"
//       );
//       if (!answer) return;
//       const { data } = await axios.delete(
//         `http://localhost:8080/api/v1/crops/delete-crop/${id}`
//       );
//       toast.success("Product deleted successfully");
//       navigate("/dashboard/admin/crops");
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <>
//       <div className="w-[100%] flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
//         <div className="lg:w-1/6 w-full ">
//           <AdminMenu />
//         </div>
//         <div className="w-full h-full overflow-auto lg:w-5/6">
//           <div className="flex gap-3 items-center">
//             <Link to="/dashboard/admin">
//               <IoMdArrowRoundBack size={22} />
//             </Link>
//             <h2 className="text-xl text-emerald-500 font-bold border-b-4 w-fit">
//               Update Crop
//             </h2>
//           </div>
//           <div className="m-1 w-75">
//             <Select
//               bordered={false}
//               placeholder="select a category"
//               size="large"
//               showSearch
//               className="form-select mb-3"
//               onChange={(value) => {
//                 setCategory(value);
//               }}
//               value={category}
//             >
//               {/* the value prop we get from the ant design */}
//               {categories?.map((c) => (
//                 <Option key={c._id} value={c._id}>
//                   {c.name}
//                 </Option>
//               ))}
//             </Select>

//             <div className="mb-3">
//               <input
//                 type="text"
//                 value={name}
//                 placeholder="write a name"
//                 className="form-control"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             {/* <div className='mb-3'> */}
//             {/* <textarea type='text' value={description} placeholder='write a description' className='form-control' onChange={(e)=>setDescription(e.target.value)}/> */}
//             {/* {description.map(({fname,lname})=>(<>{fname}{lname}</>))} */}
//             <div>
//               <button onClick={handleClick}>Add</button>
//               {description.map((val, i) => {
//                 return (
//                   <div>
//                     <input
//                       name="fname"
//                       value={val.fname}
//                       placeholder="write a description"
//                       className="form-control"
//                       onChange={(e) => handleChange(e, i)}
//                     />
//                     <input
//                       name="lname"
//                       value={val.lname}
//                       placeholder="write a description"
//                       className="form-control"
//                       onChange={(e) => handleChange(e, i)}
//                     />

//                     <button onClick={handleDelete}>Delete</button>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mb-3">
//               <button className="btn btn-primary" onClick={handleUpdate}>
//                 Update PRODUCT
//               </button>
//               <button className="btn btn-danger" onClick={handleDelete2}>
//                 DELETE PRODUCT
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdateCrop;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Select } from "antd";
// import AdminMenu from "../../../components/AdminMenu";
// import { IoMdArrowRoundBack } from "react-icons/io";

// const { Option } = Select;

// const UpdateCrop = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState([]);
//   const [id, setId] = useState("");

//   const navigate = useNavigate();
//   const params = useParams();

//   // Fetch single product details on component mount
//   useEffect(() => {
//     const getSingleProduct = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:8080/api/v1/crops/get-crop/${params.slug}`
//         );
//         const { name, description, category, _id } = data.product;
//         setName(name);
//         setDescription(description);
//         setCategory(category._id);
//         setId(_id);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         toast.error("Failed to fetch product details");
//       }
//     };
//     getSingleProduct();
//   }, [params.slug]);

//   // Fetch all categories on component mount
//   useEffect(() => {
//     const getAllCategories = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8080/api/v1/category/get-category/"
//         );
//         if (data?.success) {
//           setCategories(data.category);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to fetch categories");
//       }
//     };
//     getAllCategories();
//   }, []);

//   // Add new description field
//   const handleAddDescription = () => {
//     setDescription([...description, { title: "", content: "" }]);
//   };

//   // Update description fields
//   const handleChange = (e, i) => {
//     const { name, value } = e.target;
//     const updatedDescription = [...description];
//     updatedDescription[i][name] = value;
//     setDescription(updatedDescription);
//   };

//   // Delete description field
//   const handleDeleteDescription = (i) => {
//     const updatedDescription = [...description];
//     updatedDescription.splice(i, 1);
//     setDescription(updatedDescription);
//   };

//   // Handle product update
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         `http://localhost:8080/api/v1/crops/update-crop/${id}`,
//         { name, description, category }
//       );
//       if (data?.success) {
//         toast.success("Product updated successfully");
//         navigate("/dashboard/admin/crops");
//       } else {
//         toast.error("Failed to update product");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       toast.error("Something went wrong while updating product");
//     }
//   };

//   // Handle product deletion
//   const handleDeleteProduct = async () => {
//     try {
//       const answer = window.prompt("Are you sure you want to delete the product?");
//       if (answer) {
//         await axios.delete(`http://localhost:8080/api/v1/crops/delete-crop/${id}`);
//         toast.success("Product deleted successfully");
//         navigate("/dashboard/admin/crops");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       toast.error("Failed to delete product");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
//       <div className="lg:w-1/6 w-full">
//         <AdminMenu />
//       </div>
//       <div className="w-full h-full overflow-auto lg:w-5/6">
//         <div className="flex items-center gap-3">
//           <Link to="/dashboard/admin">
//             <IoMdArrowRoundBack size={22} />
//           </Link>
//           <h2 className="text-xl text-emerald-500 font-bold border-b-4">Update Crop</h2>
//         </div>
//         <div className="m-1 w-75">
//           <Select
//             bordered={false}
//             placeholder="Select a category"
//             size="large"
//             showSearch
//             className="form-select mb-3"
//             onChange={(value) => setCategory(value)}
//             value={category}
//           >
//             {categories.map((c) => (
//               <Option key={c._id} value={c._id}>
//                 {c.name}
//               </Option>
//             ))}
//           </Select>
//           <input
//             type="text"
//             value={name}
//             placeholder="Enter name"
//             className="form-control mb-3"
//             onChange={(e) => setName(e.target.value)}
//           />
//           <button className="btn btn-primary mb-3" onClick={handleAddDescription}>
//             Add Description
//           </button>
//           {description.map((desc, i) => (
//             <div key={i} className="mb-3">
//               <input
//                 name="title"
//                 value={desc.title}
//                 placeholder="Enter first description"
//                 className="form-control"
//                 onChange={(e) => handleChange(e, i)}
//               />
//               <input
//                 name="content"
//                 value={desc.content}
//                 placeholder="Enter last description"
//                 className="form-control"
//                 onChange={(e) => handleChange(e, i)}
//               />
//               <button className="btn btn-danger" onClick={() => handleDeleteDescription(i)}>
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button className="btn btn-primary mr-2" onClick={handleUpdate}>
//             Update Product
//           </button>
//           <button className="btn btn-danger" onClick={handleDeleteProduct}>
//             Delete Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateCrop;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import AdminMenu from "../../../components/AdminMenu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const { Option } = Select;

const UpdateCrop = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/crops/get-crop/${params.slug}`
        );
        const { name, description, category, _id } = data.product;
        setName(name);
        setDescription(description);
        setCategory(category._id);
        setId(_id);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details");
      }
    };
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/category/get-category/"
        );
        if (data?.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleAddDescription = () => {
    setDescription([...description, { title: "", content: "" }]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const updatedDescription = [...description];
    updatedDescription[i][name] = value;
    setDescription(updatedDescription);
  };

  const handleDeleteDescription = (i) => {
    const updatedDescription = [...description];
    updatedDescription.splice(i, 1);
    setDescription(updatedDescription);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        name,
        description,
        category,
      };
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/crops/update-crop/${id}`,
        updatedProduct
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/crops");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong while updating product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete the product?"
      );
      if (answer) {
        await axios.delete(
          `http://localhost:8080/api/v1/crops/delete-crop/${id}`
        );
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/crops");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row p-5 lg:px-10 h-screen">
      <div className="lg:w-1/6 w-full">
        <AdminMenu />
      </div>
      <div className="w-full h-full overflow-auto lg:w-5/6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/admin">
            <IoMdArrowRoundBack size={22} />
          </Link>
          <h2 className="text-xl text-emerald-500 font-bold border-b-4">
            Update Crop
          </h2>
        </div>
        <form onSubmit={handleUpdateProduct} className="flex flex-col my-4">
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="border rounded-md mb-3"
            onChange={(value) => setCategory(value)}
            value={category}
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <input
            type="text"
            value={name}
            placeholder="Enter name"
            className="border rounded-md p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            className="flex justify-center my-4 w-fit rounded-md bg-emerald-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
            onClick={handleAddDescription}
          >
            Add Description
          </button>
          {description.map((desc, i) => (
            <div key={i} className="mb-3 flex flex-col gap-4">
              <input
                name="title"
                value={desc.title}
                placeholder="Enter title"
                className="border rounded-md p-2"
                onChange={(e) => handleChange(e, i)}
              />
              <textarea
                name="content"
                value={desc.content}
                placeholder="Enter description"
                rows={3}
                className="border rounded-md p-2"
                onChange={(e) => handleChange(e, i)}
              ></textarea>
              <button
                type="button"
                className="flex justify-center w-fit rounded-md bg-red-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
                onClick={() => handleDeleteDescription(i)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex justify-center w-fit rounded-md bg-emerald-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
            >
              Update Product
            </button>
            <button
              type="button"
              className="flex justify-center w-fit rounded-md bg-red-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
              onClick={handleDeleteProduct}
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCrop;

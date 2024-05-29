import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/layout/Layout";

export default function CropDetails() {
  const [features, setFeatures] = useState([]);
  const [name, setName] = useState("");
  const params = useParams();
  const getTheCrop = async () => {
    try {
      console.log(params.slug);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/crops/get-crop/${params.slug}`
      );
      if (data) {
        // toast.success("got the data");
        console.log(data);
        setFeatures(data.product.description);
        setName(data.product.name);
      } else {
        toast.error("some error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTheCrop();
  }, []);

  return (
    <Layout>
      <div className="w-[100%]">
        <div className="w-[90%] my-10 mx-auto">
          <h1 className="text-2xl w-fit font-bold mb-6 border-b-4">
            <span className="text-emerald-500">{name}</span> को कैसे उगायें
          </h1>

          <div className="flex flex-col">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex border rounded-md p-5 bg-gray-50 hover:shadow-md flex-col leading-7"
                >
                  <dt className="inline text-emerald-500 font-medium">
                    {feature.title} :
                  </dt>{" "}
                  <dd className="inline">{feature.content}</dd>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-start md:gap-4 mt-6">
              <Link
                to="https://www.commodityinsightsx.com/commodities/cereals"
                target="_blank"
                className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm shadow-md font-semibold text-white hover:bg-emerald-400"
              >
                विक्रय मूल्य देखें
              </Link>
              <p className="text-[12px] justify-end">
                *आपको Commodity Insights पर मूल्य सूचना के लिए भेज रहा हूं
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

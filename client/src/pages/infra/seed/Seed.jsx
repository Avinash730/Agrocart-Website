import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../../components/layout/Spinner";

export default function Seed() {
  const [seed, setSeed] = useState([]);
  const [loading, setLoading] = useState(true);

  // get
  const getAllSeed = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/seed/get-seed"
      );
      const data = response.data;
      if (data && data.success) {
        setSeed(data.seed);
      } else {
        toast.error("Failed to fetch seed data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching seed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSeed();
  }, []);

  return (
    <Layout>
      <div className="w-[100%]">
        <div className="w-[90%] my-10 mx-auto">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            बीज भंडारित करें
          </h1>
          <div className=" space-y-5">
            <p className="flex items-start justify-start ">
              बीजों की व्यवहार्यता सुनिश्चित करने के लिए उनका उचित भंडारण करना
              महत्वपूर्ण है भविष्य में रोपण के लिए. इसके लिए यहां कुछ सामान्य
              दिशानिर्देश दिए गए हैं विभिन्न प्रकार के बीजों का भंडारण:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {loading ? (
                <Spinner />
              ) : (
                seed.map((s, index) => (
                  <div
                    key={s._id}
                    className="bg-gray-50 p-5 rounded-md hover:shadow-md"
                  >
                    <h1 className="flex items-start justify-start">
                      <span className="font-medium text-lg text-emerald-500">
                        {index + 1}. {s.name}
                      </span>
                    </h1>
                    {/* Map over descriptions array */}
                    {s.descriptions.map((description, descIndex) => (
                      <p key={descIndex} className=" flex mt-2 gap-2">
                        <span className="text-4xl text-emerald-500">.</span>
                        {description}
                      </p>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-6 ">
            <Link
              to="/contact"
              className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 shadow-md text-white hover:bg-emerald-400"
            >
              खरीदने या बेचेंने या बीज भंडारण करने के लिए हमसे संपर्क करें
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

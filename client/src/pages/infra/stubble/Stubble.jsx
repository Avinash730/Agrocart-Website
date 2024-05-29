import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../../components/layout/Spinner";

export default function Stubble() {
  const [stubble, setStubble] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllStubble = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/stubble/get-stubble"
      );
      const data = response.data;

      if (data && data.success) {
        setStubble(data.stubble);
      } else {
        toast.error("Failed to fetch stubble data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching Stubble");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStubble();
  }, []);

  return (
    <Layout>
      <div className="w-[100%]">
        <div className="w-[90%] my-10  mx-auto">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            पराली
          </h1>
          <div className=" space-y-5">
            <p className="flex items-start justify-start ">
              पराली (स्टबल) एक कृषि शब्द है जिसका अर्थ होता है खेती के बाद रह
              जाने वाली फसल की छोटी-छोटी डालें या तने। यह फसल के बाद की रेसिड्यू
              का हिस्सा होता है जो कि किसान खेतों से हटा देते हैं ताकि नई फसल
              बोने के लिए तैयारी की जा सके। <br /> पराली के प्रमुख उत्पादों में
              निम्नलिखित शामिल हो सकते हैं:
            </p>

            <div className="space-y-5">
              {loading ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                  {stubble.map((s, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-5 rounded-md hover:shadow-md"
                    >
                      <span className="font-medium text-lg text-emerald-500">
                        {index + 1}. {s.name}:
                      </span>
                      <p className="flex mt-2 flex-col md:flex-row">
                        {s.descriptions}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="flex mt-5 ">
            हालाँकि, फसल के प्रकार, जलवायु और कृषि प्रणाली के आधार पर पराली
            प्रबंधन प्रथाएँ भिन्न हो सकती हैं। कुछ किसान जुताई के माध्यम से
            पराली को मिट्टी में मिलाने का विकल्प चुन सकते हैं या इसे तेजी से
            तोड़ने के लिए पराली मल्चर या श्रेडर जैसे विशेष उपकरणों का उपयोग कर
            सकते हैं। अन्य लोग इसे संरक्षण जुताई या बिना जुताई वाली खेती के रूप
            में सतह पर अछूता छोड़ सकते हैं। पराली प्रबंधन पद्धति का चुनाव मिट्टी
            के प्रकार, फसल चक्र और संरक्षण लक्ष्य जैसे कारकों पर निर्भर करता है।
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Link
              to="/contact"
              className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 shadow-md text-white hover:bg-emerald-400"
            >
              खरीदने या बेचेंने के लिए हमसे संपर्क करें
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

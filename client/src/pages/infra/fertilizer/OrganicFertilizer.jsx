import { Link } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import { BsDot } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../../components/layout/Spinner";

export default function OrganicFertilizer() {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrganicFerti = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/organicFerti/get-organicFerti"
      );
      if (data && data.success) {
        setFertilizers(data.ferti); // Update state with fetched fertilizers
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching organic fertilizers");
    } finally {
      // Set loading to false whether data was fetched successfully or not
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrganicFerti();
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <div className="w-[90%] my-10 mx-auto">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            जैविक खाद कैसे बनाये
          </h1>
          <div className="text-14px md:text-16px leading-6">
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                {loading ? (
                  <Spinner />
                ) : (
                  fertilizers.map((fertilizer) => (
                    <div
                      key={fertilizer._id}
                      className="bg-gray-50 p-5 rounded-md hover:shadow-md"
                    >
                      <span className="flex items-center font-medium text-emerald-500">
                        <BsDot size={28} />
                        {fertilizer.name}
                      </span>
                      <div className="pl-7">{fertilizer.description}</div>
                    </div>
                  ))
                )}
              </div>
              <p>
                यह प्रक्रिया सरल होती है और इसमें कुछ सामग्री के साथ सहायता
                मिलनी चाहिए जैसे की खाद, गोबर, और प्राकृतिक स्रोतों का उपयोग
                करना।
              </p>
              <Link
                to="/contact"
                className="flex lg:w-fit items-center rounded-md bg-emerald-500 px-3.5 py-2.5 shadow-md text-white hover:bg-emerald-400"
              >
                जैविक खाद खरीदने या बेचने के लिए हमसे संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

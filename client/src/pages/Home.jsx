import React from "react";
import Layout from "../components/layout/Layout";
import Marquee from "../components/Marquee";
import { Link } from "react-router-dom";
import Weather from "../components/weather/Weather";
import Bot from "../components/Bot";
import { useAuth } from "../context/auth";

const infraStructure = [
  {
    link: "/crop",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqbpfuGsTPDY_vFqrywCAxr_xrFx-ceYDOtQrlavUtJ6Y0BKUAAnYxSN6GeVwhCAl9Sro&usqp=CAU",
    title: "फसल उत्पादन",
  },

  {
    link: "/fertilizer",
    image:
      "https://thumbs.dreamstime.com/b/potted-plant-packing-soil-potting-soil-various-fertilizers-bottles-spray-gun-vector-illustration-flat-style-269770498.jpg",
    title: "उर्वरक",
  },
  {
    link: "/advanceEqp",
    image:
      "https://img.freepik.com/premium-vector/tractor-watering-large-field-with-special-device-concept-agricultural-machinery-isolated-white_169479-2060.jpg",
    title: "उन्नत कृषि उपकरण",
  },
  {
    link: "/stubble",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwnCDK0ZvGpQouWIwyS47oukpjL1owyx-bVw&usqp=CAU",
    title: "पराली",
  },
  {
    link: "/soil",
    image:
      "https://img.freepik.com/premium-vector/flat-design-soil-analysis_108061-1035.jpg?w=2000",
    title: "मिट्टी परीक्षण",
  },
  {
    link: "/greenhouse",
    image:
      "https://media.istockphoto.com/id/1130687594/vector/greenhouse-isometric-3d-icon-growing-seedlings-in-glasshouse.jpg?s=612x612&w=0&k=20&c=IN34OXp6YCfG6lf1xUaW_ymoDacMZQwaXxGejJL2B_E=",
    title: "ग्रीन हाउस",
  },
  {
    link: "/seed",
    image:
      "https://media.istockphoto.com/id/513319642/vector/set-of-illustrations-with-phases-plant-growth-image-for-banners.jpg?s=612x612&w=0&k=20&c=J9070xddZG3ljA40GbclDl8YuUhZo9DoQ-Y7OGAantQ=",
    title: "बीज भंडारित करें",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUmrMekcW3uCzT5EDz0P7ZcOUwptoK5ECUvc6ATn0EKhYzSfNSWvqvD8ZcFSQ2D5hrpc&usqp=CAU",
    title: "अधिक और विकल्प जल्द ही आ रहे हैं...",
  },
];

export default function Home() {
  const [auth] = useAuth();

  return (
    <Layout>
      {/* home banner  */}
      <div className="w-[90%] mx-auto mt-6 rounded-md border shadow-md hover:shadow-lg h-60 md:min-h-[400px] flex flex-col space-y-3 justify-center items-center bg-hero opacity-90 bg-no-repeat bg-cover">
        <h1 className="font-semibold font-serif text-4xl text-center text-white md:text-7xl">
          अपनी फसल अपनी सुरक्षा
        </h1>
        <div className="flex gap-4 font-medium">
          <Link
            to="/about"
            className="text-white border shadow-md border-emerald-500 py-2 px-5 mt-4 rounded-lg bg-emerald-500 hover:bg-white hover:text-emerald-500"
          >
            अधिक
          </Link>
          <Link
            to="/contact"
            className="text-emerald-500 border shadow-md border-emerald-500 py-2 px-5 mt-4 rounded-lg bg-white hover:bg-emerald-500 hover:text-white"
          >
            संपर्क करें
          </Link>
        </div>
      </div>

      <div className="w-[100%]">
        {/* weather */}
        <div className="w-[90%] mx-auto my-10 ">
          <Weather />
        </div>

        {/* News  */}
        <div className="w-[90%] mx-auto my-10 ">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            समाचार
          </h1>
          <Marquee />
        </div>

        {/* infraStructure  */}
        <div className="w-[90%] mx-auto my-10 ">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            इन्फ्रास्ट्रक्चर
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infraStructure.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="w-[100%] md:w-[320px] h-[180px] border  flex flex-col space-y-2 items-center justify-center bg-gray-50 rounded-md shadow-sm hover:shadow-md"
              >
                <img src={item.image} className="w-[80px] h-[80px]" alt="" />
                <h1 className="font-medium">{item.title}</h1>
              </Link>
            ))}
          </div>
        </div>

        {/* benifits  */}
        <div className="w-[90%] mx-auto my-8">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            किसे फायदा
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border  flex flex-col space-y-2 p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md">
              <h2 className="text-lg text-emerald-500">छोटी जोत वाले किसान</h2>
              <p className="">
                विकासशील देशों में कई छोटे किसान गरीबी में रहते हैं, और अपनी आय
                के प्राथमिक स्रोत के रूप में कृषि पर निर्भर हैं। वे अक्सर परिवार
                के कई सदस्यों का समर्थन करते हैं, और अपनी फसलों के पोषण के लिए
                साल भर कड़ी मेहनत करते हैं और अपने परिवारों के लिए निम्नलिखित
                आवश्यक चीजें प्रदान करने के लिए पर्याप्त पैसा कमाते हैं:{" "}
                <span className="font-bold flex gap-2">
                  खाना, आश्रय, स्वास्थ्य, देखभाल शिक्षा
                </span>
              </p>
            </div>
            <div className="border  flex flex-col space-y-2 p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md">
              <h2 className="text-lg text-emerald-500">स्थानीय कृषि व्यवसाय</h2>
              <p className="">
                अपनी फसल अपनी सुरक्षा स्थानीय कृषि उद्यमों को अपने संचालन में
                सुधार करने में मदद करता है ताकि वे छोटे किसानों से अधिक खरीद
                सकें, अधिक कृषि वस्तुओं को संसाधित या बेच सकें, और अपने समुदाय
                के लिए नौकरियां पैदा कर सकें।
              </p>
            </div>
            <div className="border  flex flex-col space-y-2 p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md">
              <h2 className="text-lg text-emerald-500">उपभोक्ताओं</h2>
              <p className="">
                किसानों के साथ अपनी फसल अपनी सुरक्षा का काम स्थानीय, क्षेत्रीय
                और अंतर्राष्ट्रीय बाजारों में उपभोक्ताओं को अधिक टिकाऊ, समावेशी
                तरीके से उत्पादित उच्च गुणवत्ता वाले खाद्य पदार्थों और पेय
                पदार्थों तक पहुंच का आनंद लेने में सक्षम बनाता है।
              </p>
            </div>
          </div>
        </div>

        {/* community  */}
        <div className="w-[90%] mx-auto my-8 rounded-md">
          <div className="w-full p-4 text-center bg-gray-50 border rounded-md shadow-sm hover:shadow-md">
            {!auth?.user ? (
              <Link
                to="/sign-in"
                className=" text-emerald-500 text-3xl font-bold"
              >
                हमारी कम्युनिटी "परामर्श" से जुड़े!
              </Link>
            ) : (
              <Link
                to="/dashboard/community"
                className="text-3xl  text-emerald-500 font-bold"
              >
                हमारी कम्युनिटी "परामर्श" से जुड़े!
              </Link>
            )}
            <p className="pt-5">
              "हम कृषि हैं, जीवन की भूमि की देखभाल करते हैं और आपके लिए आहार की
              समृद्धि को सुनिश्चित करते हैं। हमारी मेहनत से हरा-भरा खेत आपके लिए
              अनंत संभावनाओं का प्रतीक है। हम कृषि के माध्यम से समृद्धि का संदेश
              भेजते हैं और आपसे सहयोग का अनुरोध करते हैं ताकि हम समुदाय के और
              आपके जीवन को सुखद और समृद्ध बना सकें।"
            </p>
          </div>
        </div>
      </div>

      {/* bots */}
      <Bot />
    </Layout>
  );
}

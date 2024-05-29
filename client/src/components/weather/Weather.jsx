import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";

const Weather = () => {
  // State variables
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const weatherData = await getWeatherFromServer(latitude, longitude);
        setData(weatherData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    // Fetch weather data when the component mounts
    fetchWeatherData();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeatherFromServer = async (latitude, longitude) => {
    try {
      // Check if latitude and longitude are not provided
      if (!latitude || !longitude) {
        latitude = 26.795083;
        longitude = 83.370833;
        console.log(
          "Using default coordinates as current location is not available."
        );
      }

      const response = await axios.get(
        // `http://localhost:8080/weather?lat=${26.795083}&lon=${83.370833}`
        `http://localhost:8080/weather?lat=${latitude}&lon=${longitude}`
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data from server:", error);
      throw error;
    }
  };

  // Helper function to convert temperature from Kelvin to Celsius
  const convertToCelsius = (temperature) => {
    if (!temperature) return "N/A";
    return (temperature - 273.15).toFixed(2);
  };

  // Hindi translations for city names (example)
  const hindiCityNames = {
    Gorakhpur: "गोरखपुर",
    Lucknow: "लखनऊ",
    Kanpur: "कानपुर",
    Firozabad: "फिरोजाबाद",
    Agra: "आगरा",
    Meerut: "मेरठ",
    Varanasi: "वाराणसी",
    Allahabad: "इलाहाबाद",
    Amroha: "अमरोहा",
    Moradabad: "मुरादाबाद",
    Aligarh: "अलीगढ़",
    Saharanpur: "सहारनपुर",
    Noida: "नोएडा",
    Loni: "लोनी",
    Jhansi: "झांसी",
    Shahjahanpur: "शाहजहांपुर",
    Rampur: "रामपुर",
    Modinagar: "मोदीनगर",
    Hapur: "हापुड़",
    Etawah: "इटावा",
    Sambhal: "संभल",
    Orai: "ओरई",
    Bahraich: "बहराइच",
    Unnao: "उन्नाव",
    "Rae Bareli": "रायबरेली",
    Lakhimpur: "लखीमपुर",
    Sitapur: "सीतापुर",
    Lalitpur: "ललितपुर",
    Pilibhit: "पीलीभीत",
    Chandausi: "चंदौसी",
    Hardoi: "हरदोई",
    Azamgarh: "आजमगढ़",
    Khair: "खैर",
    Sultanpur: "सुल्तानपुर",
    Tanda: "तांदा",
    Nagina: "नगीना",
    Shamli: "शामली",
    Najibabad: "नजीबाबाद",
    Shikohabad: "शिकोहाबाद",
    Sikandrabad: "सिकंदराबाद",
    "Shahabad, Hardoi": "शाहाबाद, हरदोई",
    Pilkhuwa: "पिलखुवा",
    Renukoot: "रेणुकूट",
    Vrindavan: "वृंदावन",
    Ujhani: "उझानी",
    Laharpur: "लहरपुर",
    Tilhar: "तिलहर",
    Sahaswan: "सहसवान",
    Rath: "राथ",
    Sherkot: "शेरकोट",
    Kalpi: "कालपी",
    Tundla: "टुंडला",
    Sandila: "सांदीला",
    Nanpara: "ननपाड़ा",
    Sardhana: "सरधना",
    Nehtaur: "नेहटौर",
    Seohara: "सेओहरा",
    Padrauna: "पदरौना",
    Mathura: "मथुरा",
    Thakurdwara: "ठाकुरद्वारा",
    Nawabganj: "नवाबगंज",
    Siana: "सियाना",
    Noorpur: "नूरपुर",
    "Sikandra Rao": "सिकंदरा राव",
    Puranpur: "पुरानपुर",
    Rudauli: "रुडौली",
    "Thana Bhawan": "थाना भवान",
    "Palia Kalan": "पालिया कलां",
    Zaidpur: "ज़ैदपुर",
    Nautanwa: "नौतनवा",
    Zamania: "ज़मानिया",
    "Shikarpur, Bulandshahr": "शिकारपुर, बुलंदशहर",
    "Naugawan Sadat": "नौगावां सादात",
    "Fatehpur Sikri": "फ़तेहपुर सीकरी",
    "Shahabad, Rampur": "शाहाबाद, रामपुर",
    Robertsganj: "रोबर्ट्सगंज",
    Utraula: "उत्रौला",
    Sadabad: "सादाबाद",
    Rasra: "रसरा",
    Lar: "लार",
    "Lal Gopalganj Nindaura": "लाल गोपालगंज निंदौरा",
    Sirsaganj: "सिरसागंज",
    Pihani: "पिहानी",
    "Shamsabad, Agra": "शमशाबाद, आगरा",
    Rudrapur: "रूद्रपुर",
    Soron: "सोरोन",
    Samdhan: "समधन",
    Sahjanwa: "सहजनवा",
    "Rampur Maniharan": "रामपुर मनीहारण",
    Sumerpur: "सुमेरपुर",
    Shahganj: "शाहगंज",
    Tulsipur: "तुलसीपुर",
    Tirwaganj: "तीरवागंज",
    Purqazi: "पुरकाज़ी",
    "Shamsabad, Farrukhabad": "शमशाबाद, फर्रुखाबाद",
    Warhapur: "वर्हापुर",
    Powayan: "पोवायन",
    Sandi: "सांडी",
    Achhnera: "अच्छनेरा",
    Naraura: "नरौरा",
    Nakur: "नकुर",
    Sahaspur: "सहसपुर",
    Safipur: "साफीपुर",
    Reoti: "रेवती",
    Sikanderpur: "सिकंदरपुर",
    Saidpur: "सैदपुर",
    Sirsi: "सिरसी",
    Purwa: "पुरवा",
    Parasi: "परासी",
    Phulpur: "फूलपुर",
    Shishgarh: "शीशगढ़",
    Sahawar: "सहवार",
    Samthar: "सामथर",
    Pukhrayan: "पुखरायन",
    Obra: "ओबरा",
    Niwai: "निवाई",
    Mirzapur: "मिर्ज़ापुर",
    Patna: "पटना",
    Gaya: "गया",
    Bhagalpur: "भागलपुर",
    Muzaffarpur: "मुज़फ्फरपुर",
    Darbhanga: "दरभंगा",
    Arrah: "आरा",
    Begusarai: "बेगूसराय",
    Chhapra: "छपरा",
    Katihar: "कटिहार",
    Munger: "मुंगेर",
    Purnia: "पूर्णिया",
    Saharsa: "सहरसा",
    Sasaram: "सासाराम",
    Hajipur: "हाजीपुर",
    "Dehri-on-Sone": "देहरी-ऑन-सोन",
    Bettiah: "बेतिया",
    Motihari: "मोतिहारी",
    Bagaha: "बगहा",
    Siwan: "सीवान",
    Kishanganj: "किशनगंज",
    Jamalpur: "जमालपुर",
    Buxar: "बक्सर",
    Jehanabad: "जहानाबाद",
    Aurangabad: "औरंगाबाद",
    Lakhisarai: "लक्खिसराय",
    Nawada: "नवादा",
    Jamui: "जमुई",
    Sitamarhi: "सीतामढ़ी",
    Araria: "अररिया",
    Gopalganj: "गोपालगंज",
    Madhubani: "मधुबनी",
    Masaurhi: "मसौढ़ी",
    Samastipur: "समस्तीपुर",
    Mokameh: "मोकामेह",
    Supaul: "सुपौल",
    Dumraon: "दुमरावन",
    Arwal: "अरवल",
    Forbesganj: "फॉर्ब्सगंज",
    "BhabUrban Agglomeration": "भाबनगर",
    Narkatiaganj: "नरकटियागंज",
    Naugachhia: "नौगछिया",
    Madhepura: "मधेपुरा",
    Sheikhpura: "शेखपुरा",
    Sultanganj: "सुल्तानगंज",
    "Raxaul Bazar": "रक्सौल बाज़ार",
    Ramnagar: "रामनगर",
    "Mahnar Bazar": "महनार बाज़ार",
    Warisaliganj: "वारिसलीगंज",
    Revelganj: "रेवेलगंज",
    Rajgir: "राजगीर",
    Sonepur: "सोनेपुर",
    Sherghati: "शेरघाटी",
    Sugauli: "सुगौली",
    Makhdumpur: "मख़दूमपुर",
    Maner: "मानेर",
    Rosera: "रोसेरा",
    Nokha: "नोखा",
    Piro: "पीरो",
    Rafiganj: "राफीगंज",
    Marhaura: "मरहौरा",
    Mirganj: "मीरगंज",
    Lalganj: "लालगंज",
    Murliganj: "मुरलीगंज",
    Motipur: "मोतीपुर",
    Manihari: "मनिहारी",
    Sheohar: "शिवहर",
    Maharajganj: "महाराजगंज",
    Silao: "सिलाओ",
    Barh: "बारह",
    Asarganj: "आसरगंज",
  };

  // Determine the Hindi name of the location (city)
  const hindiLocationName = hindiCityNames[data?.name] || data?.name || "N/A";

  // Hindi date format
  const hindiDate = new Date().toLocaleDateString("hi-IN", {
    day: "numeric",
    month: "short",
  });

  // Hindi weather condition
  const hindiWeatherMain =
    {
      Clear: "साफ",
      Clouds: "बादल",
      Rain: "बारिश",
      Snow: "बर्फ",
      Thunderstorm: "आंधी-तूफान",
      Mist: "कोहरा",
      Haze: "धुंध",
      // Add more translations as needed for other weather conditions
    }[data?.weather?.[0]?.main] || "N/A";

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex w-full border p-10 rounded-md bg-gray-50 items-center justify-center hover:shadow-md">
            <h1 className="text-2xl w-fit font-bold flex items-center gap-2">
              {hindiLocationName},{" "}
              <p className="text-base">
                {" "}
                {hindiDate}, {new Date().getFullYear()}
              </p>
            </h1>
          </div>
          <div className="flex w-full border p-10 rounded-md bg-gray-50 items-center justify-center hover:shadow-md">
            <p>
              {hindiWeatherMain}, {convertToCelsius(data?.main?.feels_like)}°C /{" "}
              {convertToCelsius(data?.main?.temp_max)}°C
            </p>
          </div>
          <div className="flex w-full border p-10 rounded-md bg-gray-50 items-center justify-center hover:shadow-md">
            <h1 className="text-xl w-fit font-bold">
              {convertToCelsius(data?.main?.temp)}°C
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;

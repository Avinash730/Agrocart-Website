import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }

      setError("");

      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-up",
        {
          name,
          email,
          password,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row gap-20 px-6 items-center justify-center">
      <div className="lg:w-[40%] w-full hidden lg:flex items-center justify-center">
        <img
          src="https://img.freepik.com/free-vector/organic-farming-concept_23-2148421518.jpg?size=626&ext=jpg&ga=GA1.1.1064716352.1714105038&semt=ais"
          alt=""
          className="w-60 lg:w-full"
        />
      </div>

      <div className="w-full space-y-4 max-w-md">
        <h5 className="text-2xl font-bold text-emerald-500">
          हमारे प्लेटफ़ॉर्म पर साइन अप करें
        </h5>
        <p className="text-sm">अपने ईमेल से सैन इन करें या एक अकाउंट बनाएं|</p>
        <form className="space-y-6 w-full mt-5" onSubmit={handleSubmit}>
          <div className="flex justify-between lg:flex-row flex-col gap-4 w-full">
            <div className="w-full mt-2">
              <label
                htmlFor="email"
                className="block mb-2  text-gray-900"
              >
                अपना नाम दर्ज करें
              </label>
              <input
                name="name"
                type="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="नाम"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="email"
                className="block mb-2  text-gray-900"
              >
                अपना ईमेल दर्ज करें
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-900"
            >
              अपना पासवर्ड भरें
            </label>
            <div className="flex items-center text-gray-900 py-3 px-2 shadow-sm placeholder:text-gray-400  bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5">
              <input
                name="password"
                type={isShowPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full outline-none bg-transparent"
              />
              {isShowPassword ? (
                <IoEyeOutline
                  size={18}
                  onClick={() => toggleShowPassword()}
                  className="text-neutral-600"
                />
              ) : (
                <IoEyeOffOutline
                  size={18}
                  onClick={() => toggleShowPassword()}
                  className="text-neutral-600"
                />
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block  text-gray-900"
              >
                सुरक्षा प्रश्न
              </label>
              <div className="flex flex-col mt-2 gap-4 lg:flex-row ">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5">
                  <option value="" disabled>
                    --सुरक्षा प्रश्न चुनें--
                  </option>
                  <option value="">तुम कौन से शहर मे पैदा हुए?</option>
                  <option value="">आपने किस हाई स्कूल में पढ़ाई की?</option>
                  <option value="">आपके पसंदीदा टूल का नाम क्या है?</option>
                </select>
                <input
                  name="text"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="उत्तर"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                />
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              className="flex w-full  justify-center rounded-md  bg-emerald-500 py-3  text-white shadow-sm hover:bg-emerald-400"
            >
              अपने अकाउंट में साइन अप करें
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          पहले से ही रजिस्टर है?
          <Link
            to="/sign-in"
            className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400"
          >
            साइन इन करें
          </Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useAuth } from "../../context/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

      setError(""); // Clear the error state if no validation errors

      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-in",
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
      <div className="lg:w-[40%] w-full  hidden lg:flex items-center justify-center">
        <img
          src="https://img.freepik.com/free-vector/organic-farming-concept_23-2148421518.jpg?size=626&ext=jpg&ga=GA1.1.1064716352.1714105038&semt=ais"
          alt=""
          className="w-60 lg:w-full"
        />
      </div>

      <div className="w-full space-y-4 max-w-md">
        <h5 className="text-2xl font-bold text-emerald-500">
          हमारे प्लेटफ़ॉर्म पर साइन इन करें
        </h5>
        <p className="text-sm">अपने ईमेल से सैन इन करें या एक अकाउंट बनाएं|</p>
        <form className="space-y-6 w-full mt-5" onSubmit={handleSubmit}>
          <div className="mt-2">
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
          <div className="">
            <div className="flex  justify-between">
              <label htmlFor="email" className="block mb-2 text-gray-900">
                अपना पासवर्ड भरें
              </label>
              <Link
                to="/forgot-password"
                className="block mb-2 text-emerald-500"
              >
                पासवर्ड भूल गए
              </Link>
            </div>
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
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              className="flex w-full  justify-center rounded-md bg-emerald-500 py-3  text-white shadow-sm hover:bg-emerald-400"
            >
              अपने अकाउंट में साइन इन करें
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          पंजीकृत नहीं है?
          <Link
            to="/sign-up"
            className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400"
          >
            अकाउंट बनाएं
          </Link>
        </p>
      </div>
    </div>
    // <Layout>
    // </Layout>
  );
}

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { authDataContext } from "../context/authContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../util/fireBase";
import { userDataContext } from "../context/userContext";

function Login() {
  const navigate = useNavigate();
   
   const {getCurrentUser} = useContext(userDataContext)!;
   const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const serverUrl = useContext(authDataContext)?.serverUrl;
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
         email, password
      },
        { withCredentials: true })
        getCurrentUser()
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const name = user.displayName || "";
    const email = user.email || "";

    if (!serverUrl) {
      console.error("Server URL not found from context");
      return;
    }

    const res = await axios.post(
      `${serverUrl}/api/auth/googleLogin`,
      { name, email },
      { withCredentials: true }
    );

    console.log(res.data);
   getCurrentUser()

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
               onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
               onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="grow border-t"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="grow border-t"></div>
        </div>

        {/* Google Login */}
        <button 
        onClick={googleLogin}
        className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Register Option */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <span onClick={() => navigate("/registation")}
            className="text-blue-600 cursor-pointer hover:underline">
            Register
          </span>
        </p>

      </div>

    </div>
  )
}

export default Login
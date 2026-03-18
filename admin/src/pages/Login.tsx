import { useContext, useState } from "react"
import { authDataContext } from "../../../client/src/context/authContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { adminDataContext } from "../context/adminContext";

function Login() {

  const navigate = useNavigate();
  const serverUrl = useContext(authDataContext)?.serverUrl

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {getCurrentAdmin} = useContext(adminDataContext)!

  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );

      console.log(response);
      getCurrentAdmin()
       navigate("/"); 

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>

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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  )
}

export default Login
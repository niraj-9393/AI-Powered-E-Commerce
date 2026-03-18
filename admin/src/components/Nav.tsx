import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { authDataContext } from "../../../client/src/context/authContext"
import { adminDataContext } from "../context/adminContext"
import axios from "axios"

function Nav() {
  let navigate = useNavigate()
  const {serverUrl} = useContext(authDataContext)!
  const {getCurrentAdmin} = useContext(adminDataContext)!
  const handleLogout = async() =>{
   try {
    const result = await axios.get(`${serverUrl}/api/auth/logout`,{
      withCredentials:true
    })
    console.log(result);
    getCurrentAdmin()
    navigate("/login")
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className='w-screen h-17.5 bg-white z-10 fixed top-0 flex items-center
     justify-between px-7.5 overflow-x-hidden shadow-md shadow-black'>

      <div
        className='w-[30%] flex items-center justify-start gap-2.5 cursor-pointer'
        onClick={() => navigate("/")}
      >
        <img src="/vcart logo.png" alt="" className='w-7.5' />
        <h1 className='text-[25px] text-[#000000] font-sans'>OneCart</h1>
      </div>
      <button 
      onClick={handleLogout}
      className='text-[15px] hover:border-2 border-[#89daea] cursor-pointer bg-[#000000ca] py-2.5 px-5 rounded-2xl text-white'>
        LogOut
      </button>

    </div>
  )
}
export default Nav;
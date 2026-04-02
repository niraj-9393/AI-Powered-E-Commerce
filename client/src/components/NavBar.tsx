
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext, useState } from "react";
import { userDataContext } from "../context/userContext";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { shopDataContext } from "../context/ShopContext";
 import logo from "../assets/vcart logo.png"
function NavBar() {
  const { userData, getCurrentUser } = useContext(userDataContext)!;
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const navigator = useNavigate();
  const serverUrl = useContext(authDataContext)?.serverUrl;
  const {search,setSearch,showSearch,setShowSearch} = useContext(shopDataContext)!
 
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      });
      console.log(result);
      navigator('/login')
      getCurrentUser();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-screen h-17.5 bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-7.5 shadow-md shadow-black'>
      <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-2.5' onClick={()=>navigator("/")}>
        <img src={logo} alt="logo" className='w-7.5' />
        <h1 className='text-[25px] text-[black] font-sans'>OneCart</h1>
      </div>
      <div className='w-[50%] lg:w-[40%] hidden md:flex'>
        <ul className='flex items-center justify-center gap-4.75 text-[white]'>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl' onClick={()=>navigator("/")}>HOME</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl' onClick={()=>navigator("/collection")}>COLLECTIONS</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl' onClick={()=>navigator("/about")}>ABOUT</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl' onClick={()=>navigator("/contact")}>CONTACT</li>
        </ul>
      </div>
      <div className='w-[30%] flex items-center justify-end gap-5'>
        {!showSearch &&
          <IoSearchCircleOutline className='w-9.5 h-9.5 text-black cursor-pointer' onClick={() => {setShowSearch(prev => !prev);
            navigator("/collection")
          }} />
        }
        {showSearch && <IoSearchCircleSharp className='w-9.5 h-9.5 text-black cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />
        }
        {!userData && <FaCircleUser className='w-7.25 h-7.25 text-[#000000] cursor-pointer' onClick={() => setShowProfile((prev) => !prev)} />}

        {userData && <div className='w-7.5 h-7.5 bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile((prev) => !prev)}>{userData?.name.slice(0, 1)}</div>}

        <MdOutlineShoppingCart className='w-7.5 h-7.5 text-black cursor-pointer hidden md:block' />
        <p className='absolute w-4.5 h-4.5 items-center justify-center bg-black px-1.25 py-0.5 text-white rounded-full text-[9px] top-2.5 right-5.75 hidden md:block'>
          10</p>

      </div>
      {showSearch &&
        <div className='w-full h-20 bg-[#d8f6f9dd] absolute top-full left-0 right-0 flex items-center justify-center '>
          <input type="text" className='w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-12.5 placeholder:text-white text-[white] text-[18px]' placeholder='Search here' value={search} onChange={(e) =>setSearch(e.target.value)}/>
        </div>}
      {showProfile && (
        <div className="absolute w-5550px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10">

          <ul className="w-full h-full flex items-start justify-around flex-col text-[17px] py-2.5 text-white">

            {!userData && <li className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer" onClick={() => {
              navigator('/login')
              setShowProfile(false);
            }}>
              Login
            </li>}

            {userData && <li className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer"
              onClick={() => {
                handleLogout();
                setShowProfile(false);
              }
              }
            >
              LogOut
            </li>}

            <li className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer">
              Orders
            </li>

            <li className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer">
              About
            </li>

          </ul>

        </div>
      )}
      <div className='w-screen h-22.5 flex items-center justify-between px-5 fixed bottom-0 left-0 bg-[#191818] md:hidden text-[12px]'>

        <button onClick={()=>navigator("/")} className='text-[white] flex items-center justify-center flex-col gap-0.5'>
          <IoMdHome className='w-7 h-7 text-[white] md:hidden' />
          Home
        </button>
        <button onClick={()=>navigator("/collection")} className='text-[white] flex items-center justify-center flex-col gap-0.5'>
          <HiOutlineCollection className='w-7 h-7 text-[white] md:hidden' />
          collections
        </button>
        <button onClick={()=>navigator("/contact")} className='text-[white] flex items-center justify-center flex-col gap-0.5'>
          <MdOutlinePermContactCalendar className='w-7 h-7 text-[white] md:hidden' />
          contact 
        </button>
        <button onClick={()=>navigator("/")} className='text-[white] flex items-center justify-center flex-col gap-0.5'>
          <MdOutlineShoppingCart className='w-7 h-7 text-[white] md:hidden' />
          cart
        </button>

      </div>

    </div>
  )
}

export default NavBar
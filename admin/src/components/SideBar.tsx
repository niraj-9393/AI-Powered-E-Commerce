import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRectangleList } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";
function Sidebar() {
    const navigate = useNavigate()
    return (

        <div className='w-[18%] min-h-screen border-r py-15 fixed left-0 top-0'>

            <div className='flex flex-col gap-4 pt-10 pl-[20%] text-[15px]'>

                <div
                    onClick={() => navigate('/add')}
                    className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>

                    <IoIosAddCircleOutline className='w-5 h-5' />

                    <p className='hidden md:block'>Add Items</p>

                </div>
                <div
                    onClick={() => navigate('/lists')}
                    className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>

                    <FaRectangleList className='w-5 h-5' />

                    <p className='hidden md:block'>Lists Items</p>

                </div>
                <div
                    onClick={() => navigate('/orders')}
                    className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>

                    <SiTicktick className='w-5 h-5' />

                    <p className='hidden md:block'>Orders</p>

                </div>

            </div>

        </div>
    )
}

export default Sidebar;
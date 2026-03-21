import { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav"
import Sidebar from "../components/SideBar"
import { authDataContext } from "../../../client/src/context/authContext";
import axios from "axios";
type Product = {
  image1: string;
  name: string;
  category: string;
  price: number;
  _id:string
};

function Lists() {
  const [list, setList] = useState<Product[]>([]);
  const { serverUrl } = useContext(authDataContext)!

  const fetchProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
      setList(result.data.product)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  const handleRemove = async (id:string) => {

    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
      if (result.data) {
        fetchProducts()
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white]'>
      <Nav />

      <div className='w-full h-full flex items-center justify-start'>
        <Sidebar />

        <div className='w-[82%] h-full lg:ml-80 md:ml-57.5 mt-17.5 flex flex-col gap-7.5 overflow-x-hidden py-12.5 ml-25'>

          <div className='w-100 h-12.5 text-[28px] md:text-[40px] mb-5 text-white'>
            All Listed Products

          </div>
          {
            list?.length > 0 ?
              (
                list.map((item, index) => (
                  <div className='w-[90%] md:h-30 h-22.5 bg-slate-600 rounded-xl flex items-center justify-start gap-1.25 md:gap-7.5 p-2.5 md:px-7.5' key={index}>
                    <img src={item.image1} className='w-[30%] md:w-30 h-[90%] rounded-lg  items-start' alt="" />
                    <div className='w-full md:text-[20px] text-[15px] text-[#bef0f3]'>{item.name}
                      <div className='md:text-[17px] text-[15px] text-[#bef3da]'>{item.category}</div>
                      <div className='md:text-[17px] text-[15px] text-[#bef3da]'>${item.price}</div>
                    </div>
                    <div className='w-[10%] h-full bg-transparent flex items-center justify-center'>
                      <span onClick={() =>handleRemove(item._id)} className='w-8.75 h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300'>
                        X
                      </span>
                    </div>

                  </div>

                ))
              )
              :
              (
                <div className="text-white text-lg">NO PRODUCT AVAILABLE</div>
              )

          }
        </div>
      </div>
    </div>
  )
}

export default Lists
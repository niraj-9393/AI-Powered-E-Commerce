import Nav from "../components/Nav";
import Sidebar from "../components/SideBar";
import upload from "../assets/empty.jpg"
import { useContext, useState } from "react";
import { authDataContext } from "../../../client/src/context/authContext";
import axios from "axios";
function Add() {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [category, setCategory] = useState<string>("Men")
  const [price, setPrice] = useState<string>("")
  const [subCategory, setSubCategory] = useState<string>("TopWear")
  const [bestseller, setBestSeller] = useState<boolean>(false)
  const [sizes, setSizes] = useState<string[]>([])
  const { serverUrl } = useContext(authDataContext)!
  const handleAddProducr = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", String(bestseller));
      formData.append("sizes", JSON.stringify(sizes));
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);

      const result = await axios.post(`${serverUrl}/api/product/addproduct`, formData, { withCredentials: true })
      console.log(result);
      if (result.data) {
        setName("")
        setDescription("")
        setCategory("Men")
        setPrice("")
        setSubCategory("TopWear")
        setBestSeller(false)
        setSizes([])
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>
      <Nav />
      <Sidebar />
      <div className='w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]' >
        <form onSubmit={handleAddProducr} className='w-full md:w-[90%] h-full mt-17.5 flex flex-col gap-7.5 py-15 px-7.5 md:px-15'>
          <div className='w-100 h-12.5 text-[25px] md:text-[40px] text-white'>
            Add Product Page
          </div>

          <div className='w-[80%] h-32.5 flex items-start justify-center flex-col mt-5 gap-2.5'>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Upload Images
            </p>
            <div className='w-full h-full flex items-center justify-start'>
              <label htmlFor="image1" className='w-16.25 h-16.25 md:w-25 md:h-25 cursor-pointer hover:border-[#46d1f7]'>
                <img
                  src={!image1 ? upload : URL.createObjectURL(image1)}
                  alt=""
                  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-2'
                />
                <input type="file" id="image1" hidden onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage1(e.target.files[0]);
                  }
                }} />
              </label>
              <label htmlFor="image2" className='w-16.25 h-16.25 md:w-25 md:h-25 cursor-pointer hover:border-[#46d1f7]'>
                <img
                  src={!image2 ? upload : URL.createObjectURL(image2)}
                  alt=""
                  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-2'
                />
                <input type="file" id="image2" hidden onChange={(e) => {

                  if (e.target.files && e.target.files[0]) {
                    setImage2(e.target.files[0]);
                  }
                  console.log(image2)
                }} />
              </label>
              <label htmlFor="image3" className='w-16.25 h-16.25 md:w-25 md:h-25 cursor-pointer hover:border-[#46d1f7]'>
                <img
                  src={!image3 ? upload : URL.createObjectURL(image3)}
                  alt=""
                  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-2'
                />
                <input type="file" id="image3" required hidden onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage3(e.target.files[0]);
                  }
                }} />
              </label>
            </div>
          </div>
          <div className='w-[80%] h-25 flex items-start ju stify-center flex-col gap-2.5'>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Name
            </p>

            <input
              type="text"
              placeholder='Type here'
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='w-150 max-w-[98%] h-10 rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]'
            />
          </div>
          <div className='w-[80%]  flex items-start ju stify-center flex-col gap-2.5'>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Description
            </p>

            <textarea
              placeholder='Type here'
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className='w-150 max-w-[98%] h-25 rounded-lg py-2 hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]'
            />
          </div>
          <div className='w-[80%] flex items-center gap-2.5 flex-wrap'>
            <div className='md:w-[30%] w-full flex items-start sm:justify-center flex-col gap-2.5'>
              <p className='text-[20px] md:text-[25px] font-semibold w-full'>
                Product Category
              </p>

              <select onChange={(e) => setCategory(e.target.value)}
                value={category} required name="" id="" className='bg-slate-600 w-[60%] px-2.5 py-1.75 rounded-lg hover:border-[#46d1f7] border-2'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className='md:w-[30%] w-full flex items-start sm:justify-center flex-col gap-2.5'>
              <p className='text-[20px] md:text-[25px] font-semibold w-full'>
                Product SubCategory
              </p>
              <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required name="" id="" className='bg-slate-600 w-[60%] px-2.5 py-1.75 rounded-lg hover:border-[#46d1f7] border-2'>
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
            <div className='w-[80%] h-25 flex items-start ju stify-center flex-col gap-2.5'>
              <p className='text-[20px] md:text-[25px] font-semibold'>
                Product Price
              </p>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder='$ 200'
                className='w-150 max-w-[98%] h-10 rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]'
              />
            </div>
            <div className='w-[80%] h-55 md:h-25 flex items-start justify-center flex-col gap-2.5 py-2.5 md:py-0'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>

              <div className='flex items-center justify-start gap-3.75 flex-wrap'>
                <div className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("S") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}
                  onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                  S
                </div>
                <div className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("M") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}
                  onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                  M
                </div>
                <div className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("L") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}
                  onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                  L
                </div>
                <div className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("XL") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}
                  onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                  XL
                </div>
                <div className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("XXL") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}
                  onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                  XXL
                </div>

              </div>
              <div className='w-[80%] flex items-center gap-3 mt-5 cursor-pointer group'>

                <input
                  checked={bestseller}
                  onChange={(e) => setBestSeller(e.target.checked)}
                  type="checkbox"
                  id='checkbox'
                  className='w-5.5 h-5.5 cursor-pointer accent-[#65d8f7] transition-all duration-200 group-hover:scale-110'
                />

                <label
                  htmlFor="checkbox"
                  className='text-[18px] md:text-[22px] font-semibold text-gray-200 group-hover:text-[#65d8f7] transition-all duration-200'
                >
                  Add to BestSeller
                </label>

              </div>
            </div>
          </div>
          <button className='w-35 px-5 py-5 rounded-xl bg-[#65d8f7] flex items-center justify-center gap-2.5 text-black active:bg-slate-700 active:text-white active:border-2 border-white'>
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add;

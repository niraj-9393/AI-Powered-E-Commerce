import { useContext, useEffect, useState } from "react"
import Title from "../components/Title"
import { shopDataContext } from "../context/ShopContext";
import Card from "../components/Card";

type product = {
  name: string;
  image1: string;
  image2: string;
  image3: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  bestseller: boolean;
}
function Collection() {
  const products = useContext(shopDataContext)?.products
  const {search,showSearch} = useContext(shopDataContext)!
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [filterProducts, setFilterProducts] = useState<product[]>([]);
  const [sortType,setSortType] = useState('relavent')
  const toggleCategory = (e: any) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }
  }
  const toggleSubCategory = (e: any) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    } 
  }
  const applyFilter = () => {
  
    let productsCopy = products;
      if(showSearch && search) {
      productsCopy = productsCopy?.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy?.filter((item) => category.includes(item.category));

    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy?.filter((item) => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy!);
  }
  useEffect(() => {
    applyFilter();
  }, [category, subCategory,search,showSearch])


  const sortProducts = () => {
  let fbCopy = [...filterProducts]

  switch (sortType) {
    case 'low-high':
      setFilterProducts(
        fbCopy.sort((a, b) => a.price - b.price)
      );
      break;

    case 'high-low':
      setFilterProducts(
        fbCopy.sort((a, b) => b.price - a.price)
      );
      break;

    default:
      break;
  }
}
useEffect(()=>{
sortProducts()
},[sortType])
  return (
    <div className='w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-17.5 overflow-x-hidden z-2'>
      <div className='md:w-[30vw] lg:w-[20vw] w-screen md:min-h-screen p-5 border-r border-gray-400 text-[#aaf5fa] lg:fixed'>

        <p className='text-[25px] font-semibold flex gap-1.25 items-center justify-start'>
          FILTERS
        </p>

        <div className='border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600'>
          <p className='text-[18px] text-[#f8fafa]'>CATEGORIES</p>
          <div className='w-57.5 h-30 flex items-start justify-center gap-2.5 flex-col'>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'>
              <input type="checkbox" value={'Men'} className='w-3' onClick={toggleCategory} />
              Men
            </p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'>
              <input type="checkbox" value={'Women'} className='w-3' onClick={toggleCategory} />
              Women
            </p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'>
              <input type="checkbox" value={'Kids'} className='w-3' onClick={toggleCategory} />
              Kids
            </p>

          </div>
        </div>
        <div className='border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600'>
          <p className='text-[18px] text-[#f8fafa]'>SUB CATEGORIES</p>
          <div className='w-57.5 h-30 flex items-start justify-center gap-2.5 flex-col'>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'>
              <input type="checkbox" value={'TopWear'} className='w-3' onClick={toggleSubCategory} />
              TopWear
            </p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'>
              <input type="checkbox" value={'BottomWear'} className='w-3' onClick={toggleSubCategory} />
              BottomWear
            </p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'>
              <input type="checkbox" value={'WinterWear'} className='w-3' onClick={toggleSubCategory} />
              WinterWear
            </p>

          </div>
        </div>

      </div>
      <div className='lg:pl-[20%] md:py-2.5'>
        <div className='md:w-[80vw] w-screen p-5 flex justify-between flex-col lg:flex-row lg:px-12.5'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select name="" id="" className='bg-slate-600 w-[60%] md:w-50 h-12.5 px-2.5 text-[white] rounded-lg hover:border-[#46d1f7] border-2' onChange={(e) =>setSortType(e.target.value)}>
            <option value="relavent" className='w-full h-full'>Sort By: Relavent</option>
            <option value="low-high" className='w-full h-full'>Sort By: Low to High</option>
            <option value="high-low" className='w-full h-full'>Sort By: High to Low</option>
          </select>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-screen min-h-[70vh] flex items-center justify-center flex-wrap gap-7.5'>
          {
            filterProducts.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
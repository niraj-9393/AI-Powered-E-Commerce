import { useContext, useEffect, useState } from "react"
import Title from "./Title"
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";


type Product = {
  _id: string;
  name: string;
  price: number;
  image1: string;
  bestseller: boolean;
};

function BestSeller() {
  const products = useContext(shopDataContext)?.products 
  const [bestSellerPro, setBestSellerPro] = useState<Product[]>([]);

  useEffect(() => {
    const filterPro  = products?.filter((item) => item.bestseller) || [];
    setBestSellerPro(filterPro);
  }, [products]);

  return (
    <div>
      <div className='h-[8%] w-full text-center mt-12.5'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100'>
          Tried, Tested, Loved Discover Our All-Time Best Sellers.
        </p>
      </div>

      <div className='w-full h-[50%] mt-7.5 flex items-center justify-center flex-wrap gap-12.5'>
        {bestSellerPro.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller
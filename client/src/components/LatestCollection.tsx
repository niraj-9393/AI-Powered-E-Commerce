import { useContext, useEffect, useState } from "react"
import Title from "./Title"
import { shopDataContext } from "../context/ShopContext"
import Card from "./Card"

function LatestCollection() {
  const products = useContext(shopDataContext)?.products;

  const [latestProduct, setLatestProduct] = useState<any[]>([]);

  useEffect(() => {
    if (products) {
      setLatestProduct(products.slice(0, 8));
    }
  }, [products]);

  return (
    <div>
      <div className='h-[8%] w-full text-center md:mt-12.5'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100'>
          Step Into Style - New Collection Dropping This Season!
        </p>
      </div>

      <div className='w-full h-[50%] mt-7.5 flex items-center justify-center flex-wrap gap-12.5'>
        {
          latestProduct?.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              image={item.image1}
              price={item.price}
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
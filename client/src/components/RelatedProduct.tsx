import { useContext, useEffect, useState } from "react"
import { shopDataContext } from "../context/ShopContext"
import Card from "./Card" 
import Title from "./Title"

type Product = {
  _id: string;
  name: string;
  price: number;
  image1: string;
  category: string;
  subCategory: string;
  sizes: string[];
};

type Props = {
  category: string;
  subCategory: string;
  currentProductId: string;
};

function RelatedProduct({ category, subCategory, currentProductId }: Props) {
  const products = useContext(shopDataContext)?.products
  const [related, setRelated] = useState<Product[]>([])

  useEffect(() => {
    if (products && products.length > 0) {
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => category === item.category)
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
      productsCopy = productsCopy.filter((item) => currentProductId !== item._id)
      setRelated(productsCopy.slice(0, 4))
    }
  }, [products, category, subCategory, currentProductId])

  if (related.length === 0) return null

  return (
    <div className="my-32.5 md:my-10 md:px-15">
      <div className="ml-5 lg:ml-20">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="w-full mt-7.5 flex items-center justify-center flex-wrap gap-12.5">
        {related.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  price: number;
  image1: string;
  bestseller:boolean;
};

type ShopContextType = {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
  getProducts: () => Promise<void>;
  currency: string;
  deliveryFee: number;
};

const shopDataContext = createContext<ShopContextType | null>(null);

function ShopContext({ children }: { children: React.ReactNode }) {
  const serverUrl = useContext(authDataContext)?.serverUrl;

  const [products, setProducts] = useState<Product[] | null>(null);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      console.log(response)
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (serverUrl) {
      getProducts();
    }
  }, [serverUrl]);

  const currency = "$";
  const deliveryFee = 19;

  const value: ShopContextType = {
    products,
    setProducts,
    getProducts,
    currency,
    deliveryFee,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
export { shopDataContext };
import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";

// ✅ Product type
type Product = {
  _id: string;
  name: string;
  price: number;
  image1: string;
  image2: string;
  image3: string;
  description: string;
  category: string;
  subCategory: string;
  bestseller: boolean;
};

// ✅ Context type (FIXED)
type ShopContextType = {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
  getProducts: () => Promise<void>;
  currency: string;
  deliveryFee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};


const shopDataContext = createContext<ShopContextType | null>(null);


function ShopContext({ children }: { children: React.ReactNode }) {
  const serverUrl = useContext(authDataContext)?.serverUrl;

  const [products, setProducts] = useState<Product[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);


  const getProducts = async () => {
    try {
      const response = await axios.get<{ product: Product[] }>(
        `${serverUrl}/api/product/list`,
        { withCredentials: true }
      );

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
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export const useShop = () => {
  const context = useContext(shopDataContext);
  if (!context) {
    throw new Error("useShop must be used within ShopContext");
  }
  return context;
};

export default ShopContext;
export { shopDataContext };
import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";

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
  sizes: string[];
};

type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

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
  cartItems: CartItem[];
  addToCart: (productId: string, size: string) => void;
  getCartCount: () => number;
  updateCart: (productId: string, size: string, quantity: number) => void;
  getUserCart: () => Promise<void>;
};


const shopDataContext = createContext<ShopContextType | null>(null);


function ShopContext({ children }: { children: React.ReactNode }) {
  const serverUrl = useContext(authDataContext)?.serverUrl;

  const [products, setProducts] = useState<Product[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  //add to cart func
  const addToCart = async (productId: string, size: string) => {
    if (!size) {
      alert("Please select a size first!")
      return
    }
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.size === size
      )
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { productId, size, quantity: 1 }]
      }
    })


    try {
      await axios.post(
        `${serverUrl}/api/cart/add`,
        { productId, size },
        { withCredentials: true }
      )
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }
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


  // update cart
  const updateCart = async (productId: string, size: string, quantity: number) => {

    setCartItems((prev) => {
      if (quantity === 0) {

        return prev.filter(
          (item) => !(item.productId === productId && item.size === size)
        )
      }
      return prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    })


    try {
      await axios.post(
        `${serverUrl}/api/cart/update`,
        { productId, size, quantity },
        { withCredentials: true }
      )
    } catch (error) {
      console.error("Error updating cart:", error)
    }
  }

 const getUserCart = async () => {
  try {
    const response = await axios.get(`${serverUrl}/api/cart/get`, {
      withCredentials: true
    })

    const cartData = response.data.cartData as Record<string, Record<string, number>>

    
    if (!cartData || Object.keys(cartData).length === 0) {
      setCartItems([])
      return
    }

    const items: CartItem[] = []
    Object.entries(cartData).forEach(([productId, sizes]) => {
      if (sizes && typeof sizes === "object") {
        Object.entries(sizes).forEach(([size, quantity]) => {
          if (quantity > 0) {
            items.push({ productId, size, quantity })
          }
        })
      }
    })

    setCartItems(items)
  } catch (error) {
    console.error("Error fetching cart:", error)
    setCartItems([])
  }
}


  useEffect(() => {
    if (serverUrl) {
      getProducts();
      getUserCart()
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
    cartItems,
    addToCart,
    getCartCount,
    updateCart,
    getUserCart,
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
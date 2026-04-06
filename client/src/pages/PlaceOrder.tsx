
import Title from "../components/Title"
import { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";

import axios from "axios";
import BillAndPayment from "../components/BillAndPayment";
import { useNavigate } from "react-router-dom";


type CartData = {
  _id: string;
  size: string;
  quantity: number;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
};

function PlaceOrder() {
  const context = useContext(shopDataContext);
  const navigate = useNavigate()
  const serverUrl = useContext(authDataContext)?.serverUrl
  const products = context?.products;
  const currency = context?.currency;
  const cartItems = context?.cartItems;
  const deliveryFee = context?.deliveryFee ?? 19;


  const [cartData, setCartData] = useState<CartData[]>([]);
  const [method, setMethod] = useState("cod")  // ← matches your screenshot: useState('cod')


 
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  // onChange handler 
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    if (!cartItems) return;
    const tempData: CartData[] = cartItems
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        _id: item.productId,
        size: item.size,
        quantity: item.quantity,
      }));
    setCartData(tempData);
  }, [cartItems]);

  const getSubtotal = () => {
    return cartData.reduce((total, item) => {
      const product = products?.find((p) => p._id === item._id);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);
  };

  const subtotal = getSubtotal();
  const total = subtotal + deliveryFee;

  //  Submit handler 
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (cartData.length === 0) {
      alert("Your cart is empty 🛒");
      return;
    }
    try {
      
      let orderItems: any[] = []

      if (cartItems) {
        for (const cartItem of cartItems) {
          if (cartItem.quantity > 0) {
            // structuredClone to avoid mutating original product
            const product = products?.find((p) => p._id === cartItem.productId)
            if (product) {
              const itemInfo = structuredClone(product) as any
              itemInfo.size = cartItem.size
              itemInfo.quantity = cartItem.quantity
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // orderData 
      const orderData = {
        address: formData,
        items: orderItems,
        amount: subtotal + deliveryFee
      }

      // switch on method
      switch (method) {
        case "cod": {
          const result = await axios.post(
            `${serverUrl}/api/order/placeorder`,
            orderData,
            { withCredentials: true }
          )
          if(result.data){
            setCartData([]);
            navigate("/order");
          }else{
            console.log(result.data.message)
          }
          break
        }

        case "razorpay": {
          // razorpay integration — add later
          console.log("Razorpay coming soon")
          break
        }

        default:
          break
      }

    } catch (error) {
      console.error("Error placing order:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-start justify-center gap-10 px-6 pt-28 pb-20">

      {/* ── Left: Delivery Form ── */}
      <div className="w-full lg:w-[50%] flex items-center justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-137.5 flex flex-col gap-4"
        >
          <div className="mb-2">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          {/* First / Last name */}
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First name"
              className="w-1/2 h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last name"
              className="w-1/2 h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            className="w-full h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
            required
          />

          {/* Street */}
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street"
            className="w-full h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
            required
          />

          {/* City / State */}
          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              className="w-1/2 h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              className="w-1/2 h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
              required
            />
          </div>

          {/* Pincode / Country */}
          <div className="flex gap-4">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={onChangeHandler}
              placeholder="Pincode"
              className="w-1/2 h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              className="w-1/2 h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
              required
            />
          </div>

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Phone"
            className="w-full h-12.5 rounded-lg bg-white/6 border border-white/10 placeholder:text-white/30 text-white text-sm px-4 focus:outline-none focus:border-[#a5faf7]/50 transition-all"
            required
          />

          {/* ── Right side on mobile shows below form ── */}
          {/* Place Order button — inside form so submit fires */}
          <div className="lg:hidden flex flex-col gap-4 mt-4">
            <BillAndPayment
              currency={currency}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              method={method}
              setMethod={setMethod}
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#3bcee848] hover:bg-[#3bcee870] active:scale-[0.98] border border-[#80808049] text-white text-sm font-semibold tracking-widest transition-all duration-200"
            >
              PLACE ORDER
            </button>
          </div>

        </form>
      </div>

      {/* ── Right: Bill + Payment (desktop) ── */}
      <div className="hidden lg:flex w-full lg:w-[50%] items-start justify-center">
        <div className="w-full max-w-115 flex flex-col gap-5">
          <BillAndPayment
            currency={currency}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            method={method}
            setMethod={setMethod}
          />
          <button
            type="submit"
            form="place-order-form"
            className="w-full py-3.5 rounded-full bg-[#3bcee848] hover:bg-[#3bcee870] active:scale-[0.98] border border-[#80808049] text-white text-sm font-semibold tracking-widest transition-all duration-200"
            onClick={() => {
              const form = document.querySelector('form') as HTMLFormElement
              form?.requestSubmit()
            }}
          >
            PLACE ORDER
          </button>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder
import { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";


type CartData = {
  _id: string;
  size: string;
  quantity: number;
};

function Cart() {
  const context = useContext(shopDataContext);
  const products = context?.products;
  const currency = context?.currency;
  const cartItems = context?.cartItems;
  const updateCart = context?.updateCart;
  const deliveryFee = context?.deliveryFee;

  const [cartData, setCartData] = useState<CartData[]>([]);
  const navigate = useNavigate();

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

  // Calculate subtotal 
  const getSubtotal = () => {
    return cartData.reduce((total, item) => {
      const product = products?.find((p) => p._id === item._id);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);
  };

  const subtotal = getSubtotal();
  const total = subtotal + (deliveryFee ?? 0);

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] px-6 pb-20">
      <div className="max-w-5xl mx-auto pt-28 flex flex-col gap-8">

        {/* ── Title ── */}
        <div className="text-center">
          <Title text1="YOUR" text2="CART" />
        </div>

        {/* ── Empty cart ── */}
        {cartData.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 mt-20 text-white/40">
            <p className="text-2xl">Your cart is empty</p>
            <button
              onClick={() => navigate("/collection")}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* ── Cart Items ── */}
        <div className="flex flex-col gap-4">
          {cartData.map((item, index) => {
            const product = products?.find((p) => p._id === item._id);
            if (!product) return null;

            return (
              <div
                key={index}
                className="w-full flex items-center gap-4 bg-white/4 border border-white/10 rounded-2xl py-4 px-5"
              >
                {/* Image */}
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-20 h-24 object-cover object-top rounded-lg shrink-0"
                />

                {/* Info */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <p className="text-white font-medium text-sm leading-tight">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-xs px-2.5 py-0.5 border border-white/10 rounded-md">
                      {item.size}
                    </span>
                    <span className="text-[#a5faf7] text-sm font-semibold">
                      {currency}{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateCart?.(item._id, item.size, item.quantity - 1)}
                    className="w-7 h-7 rounded-md border border-white/20 text-white/70 hover:border-white/50 hover:text-white flex items-center justify-center text-lg transition-all"
                  >
                    −
                  </button>
                  <span className="text-white text-sm w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCart?.(item._id, item.size, item.quantity + 1)}
                    className="w-7 h-7 rounded-md border border-white/20 text-white/70 hover:border-white/50 hover:text-white flex items-center justify-center text-lg transition-all"
                  >
                    +
                  </button>
                </div>

                {/* Item total */}
                <p className="text-white font-semibold text-sm w-20 text-right shrink-0">
                  {currency}{(product.price * item.quantity).toLocaleString()}
                </p>

                {/* Remove button */}
                <button
                  onClick={() => updateCart?.(item._id, item.size, 0)}
                  className="text-white/20 hover:text-red-400 transition-all text-xl shrink-0 ml-2"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Order Summary ── */}
        {cartData.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-6 mt-4">

            {/* Continue shopping */}
            <div className="flex-1 flex items-end">
              <button
                onClick={() => navigate("/collection")}
                className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm transition-all"
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Summary box */}
                <div className="lg:w-95 flex flex-col gap-4 bg-white/4 border border-white/10 rounded-2xl p-6">
              <Title text1="ORDER" text2="SUMMARY" />

              <div className="flex flex-col gap-3 text-sm mt-2">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery Fee</span>
                  <span>{currency}{deliveryFee}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-white font-semibold text-base">
                  <span>Total</span>
                  <span>{currency}{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/place-order")}
                className="w-full py-3 rounded-full bg-[#a5faf7] hover:bg-[#7ef5f0] text-black text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] mt-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;
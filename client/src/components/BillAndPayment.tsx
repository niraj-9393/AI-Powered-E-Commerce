
import razorpaylogo from "../assets/rpay.png"
import Title from "./Title";
function BillAndPayment({
  currency, subtotal, deliveryFee, total, method, setMethod
}: {
  currency?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  method: string;
  setMethod: (m: string) => void;
}) {
  return (
    <>
      {/* Total Bill */}
      <div className="w-full flex flex-col gap-4 bg-white/4 border border-white/10 rounded-2xl p-6">
        <Title text1="TOTAL" text2="BILL" />
        <div className="flex flex-col gap-3 text-sm mt-1">
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
      </div>

      {/* Payment Method */}
      <div className="w-full flex flex-col gap-3 bg-white/4 border border-white/10 rounded-2xl p-6">
        <Title text1="PAYMENT" text2="METHOD" />
        <div className="flex flex-col sm:flex-row gap-3 mt-2">

          {/* COD */}
          <button
            type="button"
            onClick={() => setMethod("cod")}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl border transition-all duration-200 ${
              method === "cod"
                ? "border-[#a5faf7] bg-[#a5faf7]/10 text-white"
                : "border-white/10 bg-white/3 text-white/50 hover:border-white/30 hover:text-white/80"
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
              method === "cod" ? "bg-[#a5faf7]" : "bg-white/20"
            }`} />
            <span className="text-sm font-medium">Cash on Delivery</span>
          </button>

          {/* Razorpay */}
          <button
            type="button"
            onClick={() => setMethod("razorpay")}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl border transition-all duration-200 ${
              method === "razorpay"
                ? "border-[#a5faf7] bg-[#a5faf7]/10"
                : "border-white/10 bg-white/3 hover:border-white/30"
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
              method === "razorpay" ? "bg-[#a5faf7]" : "bg-white/20"
            }`} />
            <img src={razorpaylogo} alt="Razorpay" className="h-5 object-contain" />
          </button>

        </div>
      </div>
    </>
  )
}
export default BillAndPayment;
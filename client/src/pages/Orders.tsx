import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { shopDataContext } from "../context/ShopContext";

type OrderItem = {
  _id: string;
  size: string;
  quantity: number;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  image1: string;
};

type Order = {
  _id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: string;
};

function Orders() {
  const serverUrl = useContext(authDataContext)?.serverUrl;
  const shop = useContext(shopDataContext);

  const currency = shop?.currency || "$";
  const products = shop?.products || [];

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/userorders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getProduct = (id: string): Product | undefined => {
    return products.find((p) => p._id === id);
  };

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex justify-center px-5 pt-25 pb-12.5">

      <div className="w-full max-w-225 flex flex-col gap-5">

        <h1 className="text-white text-[22px] mb-2.5">MY ORDERS</h1>

        {orders.length === 0 ? (
          <p className="text-white opacity-60">No orders yet 🛒</p>
        ) : (
          orders.map((order) =>
            order.items.map((item, index) => {
              const product = getProduct(item._id);

              return (
                <div
                  key={index}
                  className="w-full flex items-center justify-between bg-[#ffffff0a] border border-[#ffffff1a] rounded-xl p-3.75 backdrop-blur-md shadow-md hover:shadow-[0_0_15px_#3bcee840] transition-all"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3.75">

                    <img
                      src={product?.image1}
                      alt=""
                      className="w-17.5 h-17.5 object-cover rounded-md"
                    />

                    <div className="flex flex-col text-white gap-1">

                      <p className="text-[16px] font-semibold">
                        {product?.name || "Product"}
                      </p>

                      <p className="text-[14px] opacity-70">
                        {currency} {product?.price} &nbsp;
                        Quantity: {item.quantity} &nbsp;
                        Size: {item.size}
                      </p>

                      <p className="text-[13px] opacity-60">
                        Date: {new Date(order.createdAt).toDateString()}
                      </p>

                      <p className="text-[13px] opacity-60">
                        Payment: {order.paymentMethod}
                      </p>

                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-end gap-2.5">

                    <div className="flex items-center gap-1.5 text-white text-[14px]">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {order.status}
                    </div>

                    <button className="px-3.75 py-1.5 bg-[#ffffff20] text-white text-[13px] rounded-md border border-[#ffffff30] hover:bg-[#ffffff30] transition-all">
                      Track Order
                    </button>

                  </div>
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
}

export default Orders;
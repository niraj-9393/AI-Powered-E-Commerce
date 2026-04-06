import { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/SideBar";
import { authDataContext } from "../../../client/src/context/authContext";
import axios from "axios";

type Order = {
  _id: string;
  items: {
    _id: string;
    size: string;
    quantity: number;
  }[];
  address: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  amount: number;
  paymentMethod: string;
  payment: boolean;
  status: string;
  createdAt: string;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { serverUrl } = useContext(authDataContext)!;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/all`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status },
        { withCredentials: true }
      );
      fetchOrders(); // refresh
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />

      <div className="w-full flex">
        <Sidebar />

        <div className="w-[82%] lg:ml-80 md:ml-57.5 mt-17.5 flex flex-col gap-7.5 py-12.5 ml-25">

          <div className="text-[28px] md:text-[40px] mb-5">
            All Orders List
          </div>

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="w-[90%] bg-slate-600 rounded-xl p-5 flex flex-col gap-4"
              >
                {/* ITEMS */}
                <div className="text-[#bef0f3]">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      ITEM: {item._id} * {item.quantity} , Size: {item.size}
                    </div>
                  ))}
                </div>

                {/* ADDRESS */}
                <div className="text-[#bef3da] text-sm">
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    {order.address.street}, {order.address.city}
                  </p>
                  <p>
                    {order.address.state}, {order.address.country}
                  </p>
                  <p>{order.address.phone}</p>
                </div>

                {/* ORDER INFO */}
                <div className="text-sm text-white opacity-80">
                  <p>Items: {order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
                  <p>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-semibold">
                    ${order.amount}
                  </p>
                </div>

                {/* STATUS CONTROL */}
                <div>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="bg-[#ffffff20] border border-[#ffffff40] px-4 py-2 rounded-md text-black"
                  >
                    <option value="pending">Pending</option>
                    <option value="packing">Packing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

              </div>
            ))
          ) : (
            <div>No Orders Found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
import  express  from "express";
import { isAdminAuth, isAuth } from "../middleware/isAuth";
import { getAllOrders, getUserOrders, orderPlaced, updateOrderStatus } from "../controllers/orderController";
const orderRouter = express.Router();
orderRouter.post("/placeorder",isAuth,orderPlaced)
orderRouter.get("/userorders", isAuth, getUserOrders);
orderRouter.post("/status", isAdminAuth, updateOrderStatus);
orderRouter.get("/all", isAdminAuth, getAllOrders);
export default orderRouter;

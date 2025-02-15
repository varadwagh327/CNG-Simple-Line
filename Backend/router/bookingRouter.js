import express from "express";
import { deleteBookingStatus, getAllBookings, postBooking, updateBookingStatus } from "../controller/bookingController.js";
import {isAdminAuthenticated, isUserAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isUserAuthenticated, postBooking);
router.get("/getall", isAdminAuthenticated, getAllBookings);
router.put("/update/:id", isAdminAuthenticated, updateBookingStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteBookingStatus);

export default router;
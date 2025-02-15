import express from "express";
import { addNewAdmin, addNewPump, getAllPump, getUserDetails, login, logoutAdmin, logoutUser, UserRegister } from "../controller/userController.js";
import {isAdminAuthenticated, isUserAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/User/register", UserRegister);
router.post("/login", login);
router.post("/admin/addnew",isAdminAuthenticated, addNewAdmin);
router.get("/Pump", getAllPump);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/User/me", isUserAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/User/logout", isUserAuthenticated, logoutUser);
router.post("/Pump/addnew", isAdminAuthenticated, addNewPump);

export default router;
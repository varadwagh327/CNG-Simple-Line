import {User} from "../models/userSchema.js";
import {catchAsyncError} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncError(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403));
    }
    next();
});


export const isUserAuthenticated = catchAsyncError(async(req, res, next) => {
    const token = req.cookies.UserToken;
    if(!token) {
        return next(new ErrorHandler("User Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "User") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403));
    }
    next();
});
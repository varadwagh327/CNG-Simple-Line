import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const UserRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !role) {
        return next(new ErrorHandler("Please fill out the entire form!", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already registered!", 400));
    }

    user = await User.create({
        firstName, lastName, email, phone, password, role,
    });
    generateToken(user, "User registered!", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please provide all details!", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Passwords do not match!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password!", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password!", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found!", 400));
    }
    generateToken(user, "User logged in successfully!", 200, res);
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !password) {
        return next(new ErrorHandler("Please fill out the entire form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Admin with this email already exists!", 400));
    }
    const admin = await User.create({
        firstName, lastName, email, phone, password, role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New admin registered!",
        admin
    });
});

export const getAllPump = catchAsyncError(async (req, res, next) => {
    const pumps = await User.find({ role: "Pump" });
    res.status(200).json({
        success: true,
        pumps
    });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
    res
        .status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Admin logged out successfully!",
        });
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
    res
        .status(200)
        .cookie("UserToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "User logged out successfully!",
        });
});

export const addNewPump = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Pump avatar is required!", 400));
    }
    const { pumpAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if (!allowedFormats.includes(pumpAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported!", 400));
    }
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !password ) {
        return next(new ErrorHandler("Please provide all details!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(pumpAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Error uploading to Cloudinary!", 500));
    }
    const pump = await User.create({
        firstName, lastName, email, phone, password, role: "Pump",
        pumpAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Pump registered!",
        pump
    });
});

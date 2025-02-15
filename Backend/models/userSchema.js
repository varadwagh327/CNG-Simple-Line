import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchama= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, " Please Provide A Valid Email!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 11 Digits!"]
    },
    password: {
        type: String,
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
        required: true,
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "User", "Pump"],
    },
    pumpAvatar: {
        public_id: String,
        url: String,
    },
});

userSchama.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchama.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password);
};

userSchama.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchama);
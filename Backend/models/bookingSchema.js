import mongoose from "mongoose";
import validator from "validator";

// Define the appointment schema
const bookingSchema = new mongoose.Schema({
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
        validate: [validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"]
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Regex to validate HHMM format (0000 to 2359)
                return /^([01]\d|2[0-3])([0-5]\d)$/.test(v);
            },
            message: "Time must be a valid 4-digit time in HHMM format (e.g., 0930)"
        },
        minLength: [4, "Time must be exactly 4 digits (HHMM)"],
        maxLength: [4, "Time must be exactly 4 digits (HHMM)"]
    },
    booking_date: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    pumpId: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Assuming the doctor is a user in your system
    },
    UserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Assuming the patient is a user in your system
    }
});

// Export the Appointment model
export const Booking = mongoose.model("Booking", bookingSchema);

import {catchAsyncError} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {Booking} from "../models/bookingSchema.js";
import {User} from "../models/userSchema.js";

export const postBooking = catchAsyncError(async(req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        booking_date,
        time,
        address
    } = req.body;

    // Check if all required fields are provided
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !booking_date ||
        !time ||
        !address
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }



   
    // Create the booking
    const booking = await Booking.create({
        firstName,
        lastName,
        email,
        phone,
        booking_date,
        time,
        address,
        UserId: req.user._id // Assuming the patient is the logged-in user
    });

    res.status(201).json({
        success: true,
        message: "Booking Sent Successfully!",
        booking,
    });
});

export const getAllBookings = catchAsyncError(async(req, res, next) => {
    const bookings = await Booking.find();
    res.status(200).json({
        success: true,
        bookings,
    });
});

export const updateBookingStatus = catchAsyncError(
    async (req, res, next) => {
        const{ id } = req.params;
        let booking = await Booking.findById(id);
        if(!booking) {
            return next(new ErrorHandler("Booking Not Found", 404));
        }
        booking = await Booking.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Booking Status Updated!",
            booking,
        });
    });

export const deleteBookingStatus = catchAsyncError(
        async (req, res, next) => {
            const{ id } = req.params;
            let booking = await Booking.findById(id);
            if(!booking) {
                return next(new ErrorHandler("Booking Not Found", 404));
            }
            await booking.deleteOne();
            res.status(200).json({
                success: true,
                message: "Booking Deleted!",
            });
    });
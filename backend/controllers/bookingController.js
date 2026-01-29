import Booking from "../models/Booking.js"
import mongoose from "mongoose";

//create new booking
export const createBooking = async(req,res)=>{

    try{
        const userId = new mongoose.Types.ObjectId('64cfa5ec5fd01e2857d91abc')
        const {serviceId,bookingDate, timeSlot, note} =req.body

        const bookingData = {
            service: serviceId,
            user: userId,
            bookingDate: new Date(bookingDate),
            timeSlot,
            note,          
        }

        const newBooking = new Booking(bookingData)
        const savedBooking = await newBooking.save()

        // await Service.findByIdAndUpdate(serviceId, {
        //     $inc: { bookedCount: 1 }
        //   });
      

        res.status(200).json({
            success:true,
            message: 'Your service is booked',
            data: savedBooking,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: 'internal server error',            
        })
    }
}

//get single booking
export const getBooking = async(req,res)=>{
    const id = req.params.id
    
    try {
        const book = await Booking.findById(id)

        res.status(200).json({
            success:true,
            message: 'sucessful',
            data: book,
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message: 'not found',            
        })
    }    
}

//get all booking
export const getAllBooking = async(req,res)=>{
    
    try {
        const book = await Booking.find()

        res.status(200).json({
            success:true,
            message: 'sucessful',
            data: book,
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: 'internal server error',            
        })
    }
    
}
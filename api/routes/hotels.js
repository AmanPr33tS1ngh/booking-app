import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, getHotelRooms11, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router=express.Router();

//Create
router.post("/",verifyAdmin,createHotel);

//Update
router.put("/:id",verifyAdmin,updateHotel)

//Delete
router.delete("/:id",verifyAdmin,deleteHotel)

//Get
router.get("/find/:id",getHotel)

//Get ALL
router.get("/",getAllHotels)

router.get("/countByCity",countByCity)

router.get("/countByType",countByType)

router.get("/room/:id",getHotelRooms)
router.get("/room11/:id",getHotelRooms11)

export default router
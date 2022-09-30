import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom ,decreaseRoom} from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router=express.Router();


//Create
router.post("/:hotelid",verifyAdmin,createRoom);

//Update
router.put("/:id",verifyAdmin,updateRoom)

//Delete
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

//Get
router.get("/:id",getRoom)

//Get ALL
router.get("/",getAllRooms)

//decrease rooms
router.put("/dec/:id/:hotelId",decreaseRoom)

export default router
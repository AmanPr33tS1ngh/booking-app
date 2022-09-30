import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'

export const createRoom=async (req,res,next)=>{
    const hotelId=req.params.hotelid;
    const newRoom=new Room(req.body)

    try{
        const savedRoom=await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,
                {$push:{rooms:{
                    _id:savedRoom._id,
                    title: savedRoom.title,
                    price:savedRoom.price,
                    maxPeople:savedRoom.maxPeople,
                    description:savedRoom.description,
                    availableRooms:savedRoom.availableRooms
                }}})
                
        } catch (error) {
            next(err)
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
} 

//Update
export const updateRoom=async (req,res,next)=>{
try {
        const updateRooms=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},
        {new : true})
        res.status(200).json(updateRooms)
    } catch (error) {
        res.status(500).json(err)
    }
}
//Delete
export const deleteRoom=async (req,res,next)=>{
    const hotelId=req.params.hotelid;

    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id}
            })
        }catch(err){
            next(err);
        }res.status(200).json("room has been deleted");
    }catch(err){
        next(err);
    }
}

//Get
export const getRoom=async (req,res,next)=>{
    try {
        const findRoom=await Room.findById(req.params.id)
        res.status(200).json(findRoom)
    } catch (error) {
        res.status(500).json(err)
    }
}

//Get all
export const getAllRooms=async (req,res,next)=>{
    try {
        const rooms=await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        res.status(500).json(err)
    }
}
export const decreaseRoom=async (req,res,next)=>{
    const id=req.params.id;
    const hotelId=req.params.hotelId;
    try {
        const room=await Room.findById(id);
        const hotel=await Hotel.findById(hotelId);
        hotel.rooms.map((roo)=>{
            if(id==roo._id){
                roo.availableRooms=roo.availableRooms-req.body.availableRooms;
            }
        })
        room.availableRooms=room.availableRooms-req.body.availableRooms
        const updatedRoom=await room.save();
        console.log(updatedRoom)
        const updatedHotel=await hotel.save();
        console.log(updatedHotel);
        res.status(200).json('updated')
    } catch (error) {
        res.status(500).json(error)
    }
}

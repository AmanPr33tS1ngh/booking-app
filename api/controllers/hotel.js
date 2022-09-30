import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

//Create
export const createHotel=async (req,res,next)=>{
    const newHotel=new Hotel(req.body);
    try{
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
    }catch (err){
       next(err);
    }
}

//Update
export const updateHotel=async (req,res,next)=>{
    try {
        const updateHotels=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},
        {new : true})
        res.status(200).json(updateHotels)
    } catch (error) {
        res.status(500).json(err)
    }
}

//Delete
export const deleteHotel=async (req,res,next)=>{
    try {
        const deleteHotels=await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel deleted")
    } catch (error) {
        res.status(500).json(err)
    }
}

//Get
export const getHotel=async (req,res,next)=>{
    try {
        const findhotel=await Hotel.findById(req.params.id)
        res.status(200).json(findhotel)
    } catch (error) {
        res.status(500).json({message:'err'})
    }
}

//Get all
export const getAllHotels=async (req,res,next)=>{
    const {min,max,...others}=req.query; 
    try {
        const hotels=await Hotel.find({
            ...others,
            cheapestPrice:{$gt:min||1,$lt:max||999}})
            .limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json(err)
    }
}

export const countByCity=async (req,res,next)=>{
    const cities=req.query.cities.split(",")
    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotel.count({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json(err)
    }
}
export const countByType=async (req,res,next)=>{
    try {
        const hotelCount=await Hotel.countDocuments({type:"hotel"})
        const apartmentCount=await Hotel.countDocuments({type:"apartment"})
        const resortCount=await Hotel.countDocuments({type:"resort"})
        const villaCount=await Hotel.countDocuments({type:"villa"})
        const cabinCount=await Hotel.countDocuments({type:"cabin"})
        

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount},
        ])
    } catch (error) {
        res.status(500).json(err)
    }
}

export const getHotelRooms=async(req,res,next)=>{
    try{
        const hotel=await Hotel.findById(req.params.id)
        // console.log(hotel);
        const list = await Promise.all(hotel.rooms.map(room=> {return Room.findById(room)}
        ))
        console.log(list);
        res.status(200).json(list)
    }catch(err){
        res.staus(500).json(err)
    }
}
export const getHotelRooms11=async(req,res,next)=>{
    try{
        const hotel=await Hotel.findById(req.params.id)
        // console.log(hotel);
        const listOfRooms=[];
        const list = await Promise.all(hotel.rooms.map(room=> {return Room.findById(room)}
        ))
        listOfRooms.push(list);
        console.log(list);
        console.log(listOfRooms);
        res.status(200).json(listOfRooms)
    }catch(err){
        res.staus(500).json(err)
    }
}
import mongoose from 'mongoose'

const RoomSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    availableRooms:{
        type:Number,
        required:true
    }

},{timestamps:true})

export default mongoose.model("Room",RoomSchema)
// roomNumbers:[{number:Number}]
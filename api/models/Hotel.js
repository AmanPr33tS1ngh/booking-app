import mongoose from 'mongoose'

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms:[ {
        title: String,
        price: Number,
        description: String,
        maxPeople: Number,
        availableRooms:Number
    }],
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }

})

export default mongoose.model("Hotel", HotelSchema)

// roomNumber:[{number:Number,unavailableDates:{type:[Date]}}],

// title price description maxpeople

//

// rooms:{
//     type:[String]
// },

// {
// 	"name":"bdya hotel",
// 	"type":"hotel",
// 	"city":"berlin",
// 	"address":"bohotdoor",
// 	"distance":"bohotdoor",
// 	"title":"hotels ka baap",
// 	"description":"mst",
// 	"rating":5,
// 	"cheapestPrice":3400,
// 	"featured":true
// }
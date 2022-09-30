import express from 'express'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router=express.Router();

//checking authentication
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user,You are logged in");
// })

// //check user
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user,You are logged in and you can delete your acc");
// })
// //check admin
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin,You are logged in and you can delete all accs");
// })

//Update
router.put("/:id",verifyUser,updateUser) 

//Delete
router.delete("/:id",verifyUser,deleteUser)

//Get
router.get("/:id",verifyUser,getUser)

//Get ALL
router.get("/",verifyAdmin,getAllUsers)

export default router
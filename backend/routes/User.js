import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import errorLogger from '../middlewares/errorLogger.js'
import auth from '../middlewares/authentication.js'
import mongoose from 'mongoose';

const UserRouter = express.Router();
dotenv.config();


UserRouter.post('/customer',async(req,res)=>{
    try {
        const {name,email,phone,role} = req.body
        
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:'User already exist'})
        }
        const user = new User({
            name ,
            email,
            phone,
            role
        })
    
        await user.save()
        return res.status(201).json({user})
    } catch (error) {
        errorLogger(error,req,res)
    }
      
})

UserRouter.post("/logout", async(req,res)=>{
    console.log("logout is being called");
    
   res.clearCookie('token',{
    httpOnly:true,
    sameSite:'none',
    secure:true
   })

   res.status(200).json({message:'User logged out successfully'})
})
UserRouter.post('/register',async(req,res)=>{
try {
    const {firstName,lastName,email,password,username,toc} = req.body
    
    const existingUser = await User.findOne({email:email})
    if(existingUser){
        return res.status(400).json({message:'User already exist'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    
    const user = new User({
        name : `${firstName} ${lastName}`,
        email,
        password:hashedPassword,
        username,
        toc
    })

    await user.save()
    return res.status(201).json({message:'User created successfuly'})
} catch (error) {
    errorLogger(error,req,res)
}
  
})

UserRouter.post('/login',async (req,res)=>{
    try {
       const {username,password} = req.body;
       const existingUser = await User.findOne({username})
       if(!existingUser){
        return res.status(404).json({
            message:'Invalid credentials'
        })
       }else{
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const token = jwt.sign({
            id:existingUser._id,
            role:existingUser.role,
            name:existingUser.name,
            adminId:existingUser.invitedBy
        },process.env.JWT_SECRET,{expiresIn:'3hr'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 3 * 60 * 60 * 1000 
        })
        return res.status(200).json({message:'User successfuly logged in'})
       }

       
    } catch (error) {
        errorLogger(error,req,res)
    }
})

UserRouter.post('/:adminId',auth,async(req,res)=>{
    try {
        const adminId = req.params.adminId;
        const {username,name,email,role} = req.body

        const admin = await User.findById(adminId)
        if(!admin){
            return res.status(404).json({message:'Admin not found'})

        }else{
            const newUser = new User({
                username,
                name,
                email,
                role,
                password:admin.password,
                invitedBy:adminId
            })
            await newUser.save()

            return res.status(200).json({
                newUser,
                message:'User created successfully'
            })
        }

    } catch (error) {
        errorLogger(error,req,res)
    }
})

UserRouter.get('/all/',auth,async(req,res)=>{
    try {
        console.log("hey"); 
        return res.status(200).json(req.user)
    } catch (error) {
        errorLogger(error, req, res)

    }
})

UserRouter.get('/:id',auth,async(req,res)=>{
    try {
        const id = req.params.id
        
        const existingUser = await User.findById(id)
        if(!existingUser){
            return res.status(404).json({message:'User not found'})
        }
        return res.status(200).json(existingUser)
    } catch (error) {
        errorLogger(error,req,res)
    }
})


UserRouter.get('/admin/:adminId',auth,async(req,res)=>{
    try {
        const adminId = req.params.adminId
        const users = await User.find({$or:[{invitedBy: new mongoose.Types.ObjectId(adminId)},{_id:adminId}]})

        if(!users.length >0){
            return res.status(400).json({message:'Users not found'})
        }
        return res.status(200).json(users)
    } catch (error) {
        errorLogger(error, req, res)

    }
})

UserRouter.put('/memberId/:id/adminId/:adminId',auth,async(req,res)=>{
    try {
        const id = req.params.id
        const adminId = req.params.adminId
        const {username,name,email,role} = req.body
          console.log("connecting.................");
          
        const admin = await User.findById(adminId)
        if(!admin){
            return res.status(404).json({message:'Admin not found'})
        }
        const existingUser  = await User.findById(id)
        if(!existingUser){
            return res.status(404).json({message:'User not found'})
        }

        if(admin._id.toString() != existingUser.invitedBy.toString()){
           return res.status(400).json({message:'Unauthorize'})
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            username,
            name,
            email,
            role
        }, { new: true });

        return res.status(200).json({updatedUser,message:'User updated successfuly'})
    } catch (error) {
        errorLogger(error, req, res)

    }

})

UserRouter.put('/:id',auth,async(req,res)=>{
    try {
        const id = req.params.id
        const {name,username,email,phone,password} = req.body

        const existingUser  = await User.findById(id)
        if(!existingUser){
            return res.status(404).json({message:'User not found'})
        }

        let updatedFields = {
            name,
            username,
            email,
            phone
          };
      
          if (password && password.trim() !== '') {
            updatedFields.password = await bcrypt.hash(password, 10);
          }

        const updatedUser = await User.findByIdAndUpdate(id,updatedFields, { new: true });

        return res.status(200).json({updatedUser,message:'User updated successfuly'})
    } catch (error) {
        errorLogger(error, req, res)

    }

})

UserRouter.delete('/member/:id/adminId/:adminId',auth,async(req,res)=>{
    try {
        const id = req.params.id
        const adminId = req.params.adminId

        const admin = await User.findById(adminId)
        if(!admin){
            return res.status(404).json({message:'Admin not found'})
        }

        const existingUser = await User.findById(id)
        if(!existingUser){
            return res.status(404).json({message:'User not found'})
        }

        if(admin._id.toString() != existingUser.invitedBy.toString()){
            return res.status(401).json({message:'Unauthorized'})
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({message:'User deleted successfully'})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

UserRouter.get('/get/customers',auth,async(req,res)=>{
    try {
        console.log("fetch customers in backend called ");
        
        const id= req.query.id;
        const role = req.query.role
        
        
        let pipeline = [
            { $lookup:{
              from:'tickets',
              localField:'_id',
              foreignField:'createdBy',
              as:'tickets'
             },},
             {$unwind:'$tickets'},
             { $lookup:{
                 from:'chats',
                 localField:'tickets._id',
                 foreignField:'ticketId',
                 as:'chats'
              }
    
             },
             { $addFields:{
                 lastChat:{$arrayElemAt: ['$chats',-1]}
             
             }
             }
            ]
            if(role === 'member'){
                pipeline.push({
                    $match:{
                        'tickets.assignedTo':new mongoose.Types.ObjectId(id)
                    }
                })
             }
             pipeline.push({$project:{
                customerId:'$_id',
                name:1,
                email:1,
                phone:1,
                ticketId:'$tickets._id',
                ticketTitle:'$tickets.title',
                ticketStatus:'$tickets.status',
                ticketAssigned:'$tickets.assignedTo',
                lastChat:'$lastChat.message',
                lastChatTime:'$lastChat.timestamp'
            }})

    
        const users = await User.aggregate(pipeline)
        return res.status(200).json(users)

    } catch (error) {
        errorLogger(error,req,res)
    }
})



export default UserRouter;
import express from 'express'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    phone:{
       type:String
    },
    role:{
        type:String,
        enum:['admin','member','customer'],
        default:'admin'
    },
    username:{
        type:String,
        unique:true,
        sparse: true

    },
    invitedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:  Date.now
    },
    updatedAt:{
        type:Date,
        default:  Date.now
    },
    toc:{
        type:Boolean
    }
})


export default mongoose.model('User',UserSchema)
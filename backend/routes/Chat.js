import express from 'express'
import errorLogger from '../middlewares/errorLogger.js'
import Chat from '../models/Chat.js'
import auth from '../middlewares/authentication.js'
import mongoose from 'mongoose'
import { parseISO, startOfWeek } from 'date-fns';

const ChatRouter = express.Router()

ChatRouter.post('/',async (req,res)=>{
    try {
        const {message,senderType, sessionId,sender,ticketId} = req.body

        const newChat = {
            message,
            senderType,
            sessionId,
            
        };
        if(sender){
            newChat.sender = sender
        }

        if(ticketId){
           newChat.ticketId = ticketId
        }
        const chat = new Chat(newChat)
        await chat.save()
      res.status(200).json({message:'Chat created'})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

ChatRouter.post('/create/chat',async (req,res)=>{
    try {
        const {senderType,message,sender,ticketId} = req.body

        const chat = new Chat({
            senderType,
            message,
            sender,
            ticketId
        })
        await chat.save()
      res.status(200).json({message:'Chat created'})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

ChatRouter.put('/assign/',async(req,res)=>{
    try {
       const {sessionId,customerId, ticketId} = req.body
       await Chat.updateMany({sessionId},{
        $set:{
           ticketId,
           sender: customerId,
           sessionId:null

        }
       }) 

       return res.status(200).json({message:'Chats assigned successfully'})
    } catch (error) {
        errorLogger(error,req,res)
    }

})

ChatRouter.get('/get-first-message',async(req,res)=>{
    try {
        const {sessionId} = req.query
        const firstChat = await Chat.findOne({sessionId})
        return res.status(200).json(firstChat)
    } catch (error) {
        errorLogger(error,req,res)
    }
})
        
ChatRouter.get('/ticketId/:id',auth,async(req,res)=>{
    try {
        const id = req.params.id        
        const chats = await Chat.find({ticketId:new mongoose.Types.ObjectId(id)})
        return res.status(200).json(chats)
        
    } catch (error) {
        errorLogger(error,req,res)
    }
})

ChatRouter.get('/',async(req,res)=>{
    try {
        const {sessionId,customerId} = req.query
        const chats = await Chat.find({
            $or:[
                {sessionId},
                {sender:customerId}
            ]
        })

        return res.status(200).json(chats)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

ChatRouter.get('/get-count',auth,async(req,res)=>{
    try {
        const totalChats = await Chat.countDocuments()
        return res.status(200).json({totalChats})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

ChatRouter.get('/get-missedChat-count',auth,async(req,res)=>{
    try {
        const missedChats = await Chat.find({missed:true})
          console.log(missedChats);
          
        const weekMap = {}
        let weekCounter = 1
        const missedChatperWeek = {}

        missedChats.forEach((chat,index)=>{
            if(chat.missed){
                
              const weekStart = startOfWeek(chat.timestamp,{weekStartsOn:1})
                                      
              if(!weekMap[weekStart]){
                weekMap[weekStart] = `Week ${weekCounter ++}`
              }

              const weekLabel = weekMap[weekStart]

              if(!missedChatperWeek[weekLabel]){
                missedChatperWeek[weekLabel] = 0
              }

              missedChatperWeek[weekLabel]++
            }
        })

        console.log(missedChatperWeek);
        
        const chatData = Object.entries(missedChatperWeek).map(([name,chats])=>({
            name,
            chats
        }))
        return res.json(chatData);
    } catch (error) {
        errorLogger(error,req,res)
    }
})




export default ChatRouter
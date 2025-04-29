import express from 'express'
import Ticket from '../models/Ticket.js'
import errorLogger from '../middlewares/errorLogger.js'
import User from '../models/User.js'
import mongoose from 'mongoose'
import auth from '../middlewares/authentication.js'

const TicketRouter = express.Router()

TicketRouter.post('/add/',async(req,res)=>{
    try {
        const {title,description,createdBy} = req.body
        const  user = await User.find({$and:[{role:'admin',invitedBy:null}]})
        if (!user || user.length === 0) {
            return res.status(404).json({ message: "No admin found to assign ticket" });
        }

        const ticket = new Ticket({
            title,
            description,
            createdBy,
            assignedTo:user[0]._id
        })

        await ticket.save()

        return res.status(200).json(ticket)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

TicketRouter.get('/get-percentage',auth,async(req,res)=>{
    try {
        const totalTickets = await Ticket.countDocuments()

        const resolvedTickets = await Ticket.countDocuments({status:'resolved'})
        
        let percentage = 0

        if (totalTickets > 0) {
            percentage = Math.floor((resolvedTickets / totalTickets) * 100);
          }

        return res.status(200).json({percentage})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

TicketRouter.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const {status,name} = req.query
        let query ={}
        
        if(status && status != 'All Tickets'){
            query.status =status.toLowerCase()
        }
        if(name){
            query.title = {$regex:name,$options:'i'}
        }
        query.assignedTo = new mongoose.Types.ObjectId(id)

        const tickets = await Ticket.find(query).populate('createdBy')

        return res.status(200).json(tickets)
        
    } catch (error) {
        errorLogger(error,req,res)
    }
})

TicketRouter.put('/assign/ticket',auth,async(req,res)=>{
    try {
        const {adminId,memberId,ticketId}=req.body

        const admin = await User.findById(adminId)
        if(!admin){
            return res.status(404).json({message:'Admin not found'})
        }

        const member = await User.findById(memberId)
        if(!member){
            return res.status(404).json({message:'Member not found'})
        }
        
        const ticket = await Ticket.findById(ticketId)

        if(!ticket){
            return res.status(404).json({message:'Ticket not found'})
        }

        const newUpdatedTicket = {
            assignedTo:memberId
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId,newUpdatedTicket,{new:true})

        return res.status(200).json({message:'Ticket assigned to member',updatedTicket})

    } catch (error) {
        
    }
})

TicketRouter.put('/update/status/:id',auth,async(req,res)=>{
    try {
        const id = req.params.id
        const {status , userId }= req.body        
        
        const existedTicked = await Ticket.findById(id)
        if(!existedTicked){
            res.status(404).json({message:'Ticket not found'})
        }
        
        if(existedTicked.assignedTo.toString()!= req.user.id.toString()){
            return res.status(401).json({message:'Unauthorized'})
        }

        const newTickit = {
            status:status.toLowerCase()
        }

    const updatedTicket = await Ticket.findByIdAndUpdate(id,newTickit,{new:true})
    return res.status(200).json({message:'Ticket status updated successfully',updatedTicket})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

TicketRouter.get('/get/average-reply-time',async(req,res)=>{
    try {
        const ticketsWithChats = await Ticket.aggregate([
            {$lookup:{
               from:'chats',
               localField:'_id',
               foreignField:'ticketId',
               as:'chats'

            }}
        ])
        
        let totalReplyTimeArray = []

        ticketsWithChats.forEach((ticket,index)=>{
          
            if(!ticket.chats.length) return;

           const chats = ticket.chats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            let replyTimeArray = [];
            let waitingCustomerTimeStamp = null
            
            chats.forEach((chat,index)=>{
                
                if(chat.senderType === 'customer'){
                   if(!waitingCustomerTimeStamp){
                    waitingCustomerTimeStamp = new Date(chat.timestamp)
                   }
                    
                }else if( (chat.senderType === 'admin'|| chat.senderType === 'member') && waitingCustomerTimeStamp){
                    const replyTime = new Date(chat.timestamp)
                    const difference = replyTime - waitingCustomerTimeStamp

                    replyTimeArray.push(difference)
                    waitingCustomerTimeStamp = null
                }
                
               
            })
          if(replyTimeArray.length  > 0){
            const totalReplyTimeForTicket = replyTimeArray.reduce((sum,time)=> sum + time ,0)
            const avgTimeForTicket = totalReplyTimeForTicket / replyTimeArray.length
            totalReplyTimeArray.push(avgTimeForTicket)
          }

        })

        let avgReplyTime  = 0
         
          if(totalReplyTimeArray.length > 0){
            const  totalReplyTime = totalReplyTimeArray.reduce((sum,time)=> sum + time ,0)
             avgReplyTime = totalReplyTime / totalReplyTimeArray.length
          }
      

        return res.json({ totalAverageReplyTime: avgReplyTime });
    } catch (error) {
        errorLogger(error,req,res)
    }
})

export default TicketRouter
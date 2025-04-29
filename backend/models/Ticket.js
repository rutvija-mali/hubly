import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
 },
  status:{
    type:String,
    enum:['resolved','unresolved'],
    default:'unresolved'
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  assignedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

})

export default mongoose.model('Ticket',TicketSchema);

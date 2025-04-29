import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    senderType: {
        type: String,
        enum: ['admin', 'member', 'customer', 'bot'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    missed: {
        type: Boolean,
        default: false
    },
    sessionId: {
        type: String,
        default: null
      }
})
export default mongoose.model('Chat',chatSchema);
import mongoose from "mongoose";

const WidgetConfigSchema = new mongoose.Schema({
    headerColor:{
        type:String,
        default:'#33475B'
    },
    backgroundColor:{
        type:String,
        default:'#EEEEEE'
    },
    customMessage1:{
        type:String,
        default:'How can i help you?'
    },
    customMessage2:{
        type:String,
        default:'Ask me anything!'
    },
    namePlaceholder:{
        type:String,
        default:'Your name'
    },
    phonePlaceholder:{
        type:String,
        default:'+1 (000) 000-0000'
    },
    emailPlaceholder:{
        type:String,
        default:'example@gmail.com'
    },
    welcomeMessage:{
        type:String,
        default:"👋 Want to chat about Hubly? I'm an chatbot here to help you find your way."
    },
    missedChatTimer:{
        type:Number,
        default:1
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true
    },
})

export default mongoose.model("WidgetConfig", WidgetConfigSchema);
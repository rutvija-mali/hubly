import cron from 'node-cron'
import WidgetConfig from './models/WidgetConfig.js'
import Chat from './models/Chat.js'

 cron.schedule('*/10 * * * *',async()=>{
    try {
        const allCustomersChats = await Chat.find({senderType :'customer'})
        console.log("cron is runned");
        
        const widgetConfig = await  WidgetConfig.findOne()

         for(const chat of allCustomersChats){
            const adminReply = await Chat.findOne({
                ticketId:chat.ticketId,
                senderType:{$in:['admin','member','bot']},
                timestamp:{$gt:chat.timestamp}
            }).sort({timestamp:1})

            
           if(!adminReply){
            const now = new Date()
            const chatTime = new Date(chat.timestamp)
            const differenceInSec = (now - chatTime )/(1000)

            if(differenceInSec > widgetConfig.missedChatTimer){
                chat.missed = true 
                await chat.save();
            }
           } 
         }

    } catch (error) {
        console.error(error.message || 'Something went wrong')
    }
})


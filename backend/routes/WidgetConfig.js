import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import auth from '../middlewares/authentication.js'
import errorLogger from '../middlewares/errorLogger.js'
import WidgetConfig from '../models/WidgetConfig.js'
import User from '../models/User.js'

const WidgetConfigRouter = express.Router()

WidgetConfigRouter.post('/', auth, async(req, res) => {
    try {
        console.log("calld api post");
        
        const configData = req.body;
        const adminId = configData.adminId;
        
       
        let existingConfig = await WidgetConfig.findOne({adminId});
        
       
         
        if (existingConfig) {
            const requestingUser = await User.findById(req.user.id);
            const isAdmin = existingConfig.adminId.toString() === req.user.id;
            const isTeamMember = requestingUser && existingConfig.adminId.toString() === requestingUser.invitedBy?.toString();

            if(!isAdmin && !isTeamMember) {
                return res.status(401).json({message: 'Unauthorized'});
            }
            
          
            existingConfig = await WidgetConfig.findOneAndUpdate(
                {adminId}, 
                configData, 
                {new: true}
            );
            return res.status(200).json({
                message: 'Widget configuration updated successfully',
                widget: existingConfig
            });
        } else {
           
            const newConfig = new WidgetConfig(configData);
            await newConfig.save();
            return res.status(201).json({
                message: 'Widget configuration created successfully',
                widget: newConfig
            });
        }
    } catch (error) {
        errorLogger(error, req, res);
    }
});

WidgetConfigRouter.put('/:id',auth,async(req,res)=>{
    try {
        const id = req.params.id
        const {headerColor,backgroundColor, customMessage1,customMessage2,namePlaceholder,phonePlaceholder,emailPlaceholder, welcomeMessage ,missedChatTimer,adminId} = req.body
        
        const existingWidget = await WidgetConfig.findById(id);
        if (!existingWidget) {
          return res.status(404).json({ message: 'Widget not found' });
        }
        
        const requestingUser = await User.findById(req.user.id)
        const isAdmin = existingWidget.adminId.toString() === req.user.id
        const isTeamMember = requestingUser && existingWidget.adminId.toString() === requestingUser.invitedBy.toString()

        if(!isAdmin && !isTeamMember){
            return res.status(401).json({message:'Unauthorize'})
        }

      const updatedWidget =  {
            headerColor,
            backgroundColor, 
            customMessage1,
            customMessage2,
            namePlaceholder,
            phonePlaceholder,
            emailPlaceholder, 
            welcomeMessage ,
            missedChatTimer,
            adminId
        }
        const updatedWidgetConfig = await WidgetConfig.findByIdAndUpdate(id,updatedWidget,{new:true})
        return res.status(200).json({message:'Widget configuration updated successfully',updatedWidgetConfig})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

WidgetConfigRouter.get('/widget',async(req,res)=>{
    try {
        
        const wingetConfig = await WidgetConfig.findOne()
   
        return res.status(200).json(wingetConfig)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

export default WidgetConfigRouter
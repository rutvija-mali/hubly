import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export default function auth(req,res,next){
  const token = req.cookies.token;
  if(!token){
  return  res.status(400).json({
        error:{
            message:'Authorization token is missing',
            status:401
        }
    })
  }
  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    return res.status(401).json({
        error:{
            message:'Invalid authorization token',
            status:401
        }
    })
  }

}
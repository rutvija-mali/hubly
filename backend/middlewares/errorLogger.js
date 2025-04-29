import fs from 'fs'
export default function errorLogger (error,req,res,next){
    const date = new Date();
    const fileName = `./logs/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const errorMessage = `${date.toISOString()}-${error.stack||error.message}`
    fs.writeFile(fileName,errorMessage,(writeErr)=>{
        if(writeErr) console.error('Error writing to error log:',writeErr)
       })

       res.status(error.status||500).json({
         message:error.message||'Something went wrong',
         status: error.status||500
       })
}
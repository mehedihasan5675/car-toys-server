const express=require('express')
const app=express()
const cors=require('cors')
const port=process.env.PORT || 5000
require('dotenv').config()


//middleware set up
app.use(cors())
app.use(express.json())

//================
app.get('/',(req,res)=>{
    res.send('Car toys server is running')
})



//================
app.listen(port,()=>{
    console.log(`server is running with port:${port}`);
    
})
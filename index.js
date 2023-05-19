const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
//=============
//MongoDB start
//=============


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruywwtc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();










//================
//Database COllection
const alltoysCollection = client.db("cars-toy-DB").collection("alltoys");

//==================







const result=await alltoysCollection.createIndex({sub_category:1})


//==================================
//MongoDB CRUD start
//===================================
//get all data by path
app.get('/alltoys',async(req,res)=>{
    const query={};
    const result=await alltoysCollection.find(query).toArray()
    res.send(result)
})
//get one data by id
app.get('/alltoys/:id',async(req,res)=>{
    const ID=req.params.id
    const query={_id:new ObjectId(ID)};
    const result=await alltoysCollection.findOne(query)
    res.send(result)
})
//get some data by category
app.get('/alltoys/:text',async(req,res)=>{
    const text=req.params.text
    const query={ sub_category: text };
    const result=await alltoysCollection.find(query).toArray()
    res.send(result)
})





//==================================
//MongoDB CRUD end
//===================================







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//==============
//MongoDB end
//================
app.listen(port,()=>{
    console.log(`server is running with port:${port}`);
    
})
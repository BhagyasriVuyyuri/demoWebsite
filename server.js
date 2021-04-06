//import express module
const exp=require("express");
const app=exp();  
const path=require("path");
const mc=require("mongodb").MongoClient;

app.use(exp.static(path.join(__dirname,"./dist/FLIPKART")))

const userApiObj=require("./APIS/userApi")

const adminApiObj = require("./APIs/adminApi");
app.use("/user",userApiObj)
app.use("/admin",adminApiObj);

const dburl="mongodb+srv://cdb37:cdb37@cluster0.rxpyc.mongodb.net/ProjectDatabase?retryWrites=true&w=majority";
 
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
       const databaseObj=client.db("ProjectDatabase");

       const userCollectionObj=databaseObj.collection("usercollection")
       
       const productCollectionObj=databaseObj.collection("productcollection")
       
       const cartCollectionObj=databaseObj.collection("cartcollection")
       const ordersCollectionObj=databaseObj.collection("orderscollection")

       
       app.set("userCollectionObj",userCollectionObj)
       app.set("productCollectionObj",productCollectionObj)
       app.set("cartCollectionObj",cartCollectionObj)
       app.set("ordersCollectionObj",ordersCollectionObj)
         console.log("Db server started")
})
.catch(err=>console.log("err in db connection",err))

app.use((req,res,next)=>{
    
       res.send({message:`${req.url} is invalid`})  
})

app.use((err,req,res,next)=>{
       res.send({message:"error occurred",reason:err.message})
})
//const port=process.env.port;
//app.listen(port,()=>console.log(`server on port ${port}....`))

const port=4000
app.listen(port,()=>console.log(`web server runs on ${port}`))



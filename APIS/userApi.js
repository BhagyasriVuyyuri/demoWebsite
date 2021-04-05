const exp=require("express");
const userApiObj=exp.Router();
const bc=require("bcryptjs")
const asynchandler=require("express-async-handler");
require("dotenv").config();
userApiObj.use(exp.json())
userApiObj.post("/register", asynchandler(async  (req,res,next)=>{
   
      let userCollectionObj=req.app.get("userCollectionObj")
     
      let userObj=req.body;
     
      let user=await userCollectionObj.findOne({username:userObj.username})
      if(user!==null){
          res.send({message:"user existed"})
      }
      else{
         let hashedpw=await bc.hash(userObj.password,6)
          userObj.password=hashedpw;
       
          let success=await userCollectionObj.insertOne(userObj)
          res.send({message:"user created"})
      }
      
     console.log("user obj is",userObj)
  }))
  
  userApiObj.post("/login", asynchandler(async  (req,res,next)=>{
      //res.send("i am from user api")
  
      let userCollectionObj=req.app.get("userCollectionObj")
      let userCredObj=req.body;
      let user=await userCollectionObj.findOne({username:userCredObj.username})
      if(user==null){
          res.send({message:"Invalid Username"})
      }
      else{
         
          let status=await bc.compare(userCredObj.password,user.password)
          if(status==true){
  
          res.send({message:"success",username:user.username})
  
          }
          else{
              res.send({message:"Invalid password"})
          }
      }
      
     
  }))
  userApiObj.post("/resetpassword",asynchandler(async(req,res,next)=>{

    userCollectionObj = req.app.get("userCollectionObj");

      obj = req.body;
      hashedpwd = await bc.hash(obj.password,5);
      let user=await userCollectionObj.findOne({username:obj.username})
      if(user==null){
          res.send({message:"invalid"})
      }
      else{
        let success=await userCollectionObj.updateOne({username:obj.username},{$set:{
            password:hashedpwd
        }})
        res.send({message:"success"});
    }
    
}))
  //get user
  userApiObj.get("/getuser/:username",asynchandler(async (req,res,next)=>{
      //get user collectionobject
      let userCollectionObj= req.app.get("userCollectionObj")
     let userObj=await userCollectionObj.findOne({username:req.params.username})
     res.send({message:"success",user:userObj})
}))

userApiObj.post("/addtocart",asynchandler(async(req,res,next)=>{

    console.log("the cart obj is ",req.body)
    let cartCollectionObj= req.app.get("cartCollectionObj");

    let cartObj=req.body;

    await cartCollectionObj.insertOne(cartObj);
    res.send({message:true})

    
}))


//get all products
userApiObj.get("/getcartitems/:username",asynchandler(async(req,res,next)=>{

    let cartCollectionObj = req.app.get("cartCollectionObj");
    
    let products = await cartCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:products})
    //console.log(products)
}))
userApiObj.post("/deleteproduct",asynchandler(async(req,res,next)=>{
    
    let cartCollectionObj = req.app.get("cartCollectionObj");
    let cartObj =  req.body;
    
    console.log("deleted product is",cartObj);
    //check for user in db
    let product = await cartCollectionObj.findOne({productname:cartObj.productname});

    //product is there
    if(product!==null){
        let remove=await cartCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }
}))
userApiObj.post("/placeOrder",asynchandler(async(req,res,next)=>{

    console.log("the cart obj is ",req.body)
    let cartCollectionObj= req.app.get("cartCollectionObj");

    let cartObj=req.body;

    await cartCollectionObj.insertOne(cartObj);
    res.send({message:true})

    
}))


userApiObj.get("/getOrders/:username",asynchandler(async(req,res,next)=>{

    let cartCollectionObj = req.app.get("cartCollectionObj");
    
    //let products = await cartCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:products})
    //console.log(products)
}))

module.exports=userApiObj;
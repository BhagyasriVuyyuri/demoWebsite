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
  
  
  
  //get user
userApiObj.get("/getuser/:username",asynchandler(async (req,res,next)=>{
      //get user collectionobject
      let userCollectionObj= req.app.get("userCollectionObj")
     let userObj=await userCollectionObj.findOne({username:req.params.username})
     res.send({message:"success",user:userObj})
}))

userApiObj.post("/addtocart",asynchandler(async(req,res,next)=>{

    //console.log("the cart obj is ",req.body)
    let cartCollectionObj= req.app.get("cartCollectionObj");

    let cartObj=req.body;
    let prd = await cartCollectionObj.findOne({productname:cartObj.productname,username:cartObj.username})
   if(prd==null){
    let userCart = await cartCollectionObj.find({  username:req.body.username});
        await cartCollectionObj.insertOne(cartObj);
        res.send({message:"success",cartsize:userCart.length})    
   }
    else{
        let userCart = await cartCollectionObj.find({  username:req.body.username});
     res.send({message:"Item already added",cartsize:userCart.length})
    }

    //await cartCollectionObj.insertOne(cartObj);
    //res.send({message:true})    
}))
//get all products
userApiObj.get("/getcartitems/:username",asynchandler(async(req,res,next)=>{

    let cartCollectionObj = req.app.get("cartCollectionObj");
    
    let products = await cartCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:products})
    //console.log(products)
}))
userApiObj.get("/getsize/:username",asynchandler(async(req,res,next)=>{
    let cartCollectionObj = req.app.get("cartCollectionObj");
    
    let cart=await cartCollectionObj.find({username:req.params.username}).toArray();
    let cartlength=cart.length;
    res.send({cartsize:cartlength } );
    //console.log("the size is ",cart);
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
    let ordersCollectionObj= req.app.get("ordersCollectionObj");

    let ordersObj=req.body;

    await ordersCollectionObj.insertOne(ordersObj);
    res.send({message:true})

    
}))

userApiObj.post("/deleteOrder1",asynchandler(async(req,res,next)=>{
    
    let cartCollectionObj = req.app.get("cartCollectionObj");
    let cartObj =  req.body;
    
    console.log("user object is",cartObj);

    //check for user in db
    let product = await cartCollectionObj.findOne({productname:cartObj.productname});

    console.log("product delete in add to cart ",product)
    //product is there
    if(product!==null){
        let remove=await cartCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))

userApiObj.post("/deleteOrder",asynchandler(async(req,res,next)=>{
    
    let ordersCollectionObj = req.app.get("ordersCollectionObj");
    let orderObj =  req.body;
    
    console.log("order object is",orderObj);
    //check for user in db
    let product = await ordersCollectionObj.findOne({productname:orderObj.productname});

    console.log("product in placeorder delete is",product);

    //product is there
    if(product!==null){
        let remove=await ordersCollectionObj.deleteOne({productname:orderObj.productname});
        res.send({message:true});
    }

}))
userApiObj.get("/getOrderitems/:username",asynchandler(async(req,res,next)=>{

    let ordersCollectionObj = req.app.get("ordersCollectionObj");
    
    let order = await ordersCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:order})
    console.log(order)
}))

module.exports=userApiObj;
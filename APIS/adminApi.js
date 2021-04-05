const exp=require("express");
const adminApiObj=exp.Router();
const asyncHandler=require("express-async-handler")
require("dotenv").config();
//extract body of req obj
adminApiObj.use(exp.json());


//import cloudinary
const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const multer=require("multer");

//configure cloudinary
cloudinary.config({ 
    cloud_name:process.env.cloudname, 
    api_key:process.env.apikey, 
    api_secret:process.env.apisecret
});

//configure cloudinarystorage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:process.env.folder,
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });

adminApiObj.post("/login", asyncHandler(async (req, res, next) => {

    //verify username
    if (req.body.username == process.env.ADMIN_USER_NAME) {

        if (req.body.password==process.env.ADMIN_PASSWORD) {
              res.send({ message: "success",username: process.env.ADMIN_USER_NAME })
        }
        //if passwords are not matched
        else {
            res.send({ message: "Invalid password" })
        }
    }
    else {
        res.send({message:"Invalid username"})
    }

}))
adminApiObj.post("/addproduct",upload.single('photo'), asyncHandler(async(req,res,next)=>{
    
    let productCollectionObj = req.app.get("productCollectionObj");
    
    
    let productObj =  JSON.parse(req.body.productObj)
    
    //console.log("object is",productObj);
    let product = await productCollectionObj.findOne({productID:productObj.productID});

    //if username alreaddy taken
    if(product!==null){
        res.send({message:"product existed"});
    }
   else{

        productObj.productImgLink = req.file.path;

        //create product
        let success=await productCollectionObj.insertOne(productObj);
        res.send({message:"product added"})    
   }
}))

//get all products
adminApiObj.get("/allproducts",asyncHandler(async(req,res,next)=>{

    let productCollectionObj = req.app.get("productCollectionObj");
    let products = await productCollectionObj.find().toArray();
    res.send({message:products})
}))

//get one products
adminApiObj.get("/oneproduct/:productname",asyncHandler(async(req,res,next)=>{
    
    let productCollectionObj = req.app.get("productCollectionObj");
    let products = await productCollectionObj.findOne({productname:req.params.productname});
    res.send({message:products})
}))






//delete from all products
adminApiObj.post("/delete",asyncHandler(async(req,res,next)=>{
    
    let productCollectionObj = req.app.get("productCollectionObj");
    let productObj =  req.body;
    
  
    let product = await productCollectionObj.findOne({productID:productObj.productID});

    
    if(product!==null){
        let remove=await productCollectionObj.deleteOne({productID:productObj.productID});
        res.send({message:true});
    }

}))
//export
module.exports = adminApiObj;
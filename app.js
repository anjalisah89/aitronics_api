require("dotenv").config();
const express = require("express");
const app = express();
const multer  = require('multer');
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const product_routes = require("./routes/products")

//storage
const storage = multer.diskStorage({
    destination:  'uploads',
    filename: (req, file, cb)=> {
      cb(null, file.filename);
    },
  })

const upload = multer({ storage: storage }).single('testImage')

app.get("/", (req,res) => {
    res.send("Hi, I am Live");
});

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            
        }
    })
})

//setting middleware
app.use("/api/products", product_routes)

const start = async () =>{
    try{
        //env encoded file and api key is at pvt.github
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () =>{
            console.log(`${PORT} Yes! I am live`);
        });
    }
    catch(error){
        console.log(error);
    }
};
start();
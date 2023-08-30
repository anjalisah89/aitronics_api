require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./model/product");

const ProductJson = require("./products.json");

const start = async () =>{
    try{
        await connectDB(process.env.MONGODB_URL);
        //to refuse the re-insertion of file data
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("Products inserted successfully");
    }
    catch(error){
        console.log(error);
    }
};

start();

//run node data.js to insert mongodb data at atlas cloud
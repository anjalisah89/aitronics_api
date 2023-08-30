import { Schema, model } from "mongoose";

const productSchema = new Schema({

    id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        data:Buffer,
        contentType:String,
    },
    price:{
        type:Number,
        required:[true, "price must be provided"],
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    company:{
        type:String,
        enum:{
            values: ["apple", "samsung", "dell", "hp", "razer", "msi","rolex","nokia","asus","lenovo", "mi"],
            message: `{VALUE} is not a valid brand.`,
        }
    },
    description:{
        type:String,
        required:true,
    },
    catogory:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
        default:false,
    }
});

export default model("Product", productSchema);


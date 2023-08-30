const Product = require("../model/product");

//main product file
const getAllProducts = async(req,res)=> {
    const {company, name, featured, sort, select} = req.query;
    const queryObject ={};

    if(company){
        //to perform searching $regex is used in mongoose with options and fields
        queryObject.company = {$regex: company, $options: "i"};
    }

    if(featured){
       queryObject.featured = featured;
    }
    
    if(name){
        queryObject.name = {$regex: name, $options: "i"};
    }

    let apiData = Product.find(queryObject);

    //sorting method
    if(sort){
       //let sortFix = sort.replace(","," ");
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
        //sort = name, price;
    }

    //select method
    if(select){
        //let selectFix = select.replace(","," ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
        //select = name, company;
       
    }
    
    //pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    //skipping the previous data while performing pagination
    let skip = (page -1) *limit;

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);
    
    const Products = await apiData;
    console.log(req.query);
    res.status(200).json({ Products, nbHits: Products.length });
};

//tesing product files via postman 
const getAllProductsTesting = async(req,res)=> {
    const myData = await Product.find(req.query).select("name company");
    console.log(req.query);
    res.status(200).json({ myData });
};
module.exports ={getAllProducts, getAllProductsTesting};

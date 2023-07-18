const Products=require('../model/product');

exports.addProductPage=(req,res)=>{
   res.render('addProduct.ejs',{title:'Admin:: Add product'})
}
exports.addProduct=(req,res)=>{
    const {Item,Price, Image, Description} = req.body;
    Products.create({
        item:Item,
        price:Price,
        image:Image,
        description:Description
    }).then(saved=>{
        res.redirect('/')
    })
}

exports.homePage=(req,res)=>{
    res.render('index.ejs')
}
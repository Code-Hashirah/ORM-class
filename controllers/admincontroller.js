const Products=require('../model/product');

exports.addProductPage=(req,res)=>{
   res.render('addProduct.ejs',{title:'Admin:: Add product'})
}
exports.addProduct=(req,res)=>{
    const {Item,Price, Image, Description, Discount} = req.body;
    Products.create({
        item:Item,
        price:Price,
        image:Image,
        description:Description,
        discount:Discount
    }).then(saved=>{
        res.redirect('/products-page')
    })
}

exports.homePage=(req,res)=>{
    Products.findAll().then(products=>{
        res.render('index.ejs',{title:'Home', Products:products})
    })
 
}

exports.productPage=(req, res)=>{
    Products.findAll().then(results=>{
        res.render('products.ejs',{Products:results, title:'Admin:: Products Page'})
    })
}
//  update products 
exports.updateProductPage=(req,res)=>{
    let Id=req.params.id;
    Products.findByPk(Id).then(result=>{
        res.render('updateProduct', {Product:result, title:'Admin:: Update product'})
    })
}
exports.updateProduct=(req,res)=>{
    const {Id, Item, Price, Image, Description,Discount}=req.body;
    Products.findOne({where:{
        id:Id
    }}).then(prod=>{
        prod.item=Item,
        prod.price=Price,
        prod.image=Image,
        prod.description=Description,
        prod.discount=Discount
        return prod.save()
    }).then(saved=>{
        res.redirect('/products-page')
    })
}

// delete product 
exports.deleteProduct=(req,res)=>{
    const {Id}=req.body;
    Products.findOne({where:{
        id:Id
    }}).then(Data=>{
        return Data.destroy()
    }).then(deleted=>{
        res.redirect('/products-page')
    })
}
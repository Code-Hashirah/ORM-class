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
        res.redirect('/products-page')
    })
}

exports.homePage=(req,res)=>{
    res.render('index.ejs')
}

exports.productPage=(req, res)=>{
    Products.findAll().then(results=>{
        res.render('products.ejs',{Products:results})
    })
}
//  update products 
exports.updateProductPage=(req,res)=>{
    let Id=req.params.id;
    Products.findByPk(Id).then(result=>{
        res.render('updateProduct', {Product:result})
    })
}
exports.updateProduct=(req,res)=>{
    const {Id, Item, Price, Image, Description}=req.body;
    Products.findOne({where:{
        id:Id
    }}).then(prod=>{
        prod.item=Item,
        prod.price=Price,
        prod.image=Image,
        prod.description=Description
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
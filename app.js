const path= require('path');
const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('sequelize');
const Sequelize=require('./database/connect')
const session=require('express-session');
const flash =require('connect-flash');
const multer=require('multer');
const productRoute=require('./router/admin')
const Session=require('./model/sessions');
const Products=require('./model/product')
const Users=require('./model/user');
const app=express();

app.use(flash());
app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false
}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

let Store=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+ file.originalname)
    }
})
app.use(multer({storage:Store}).single('image'))

app.use(productRoute)

app.set('view engine', 'ejs');


// Products.sync({alter:true})
Sequelize.sync()
.then(conn=>{
    app.listen(5000, ()=>{
        console.log("Server is running on port 5000")
    })
  
}).catch(err=>{
    console.log(err)
})
const Sequelize=require('../database/connect');
const sequelize=require('sequelize');
const Products=Sequelize.define('products',{
id:{
    type:sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
},
item:{
    type:sequelize.STRING(50),
    allowNull:false,
},
price:{
    type:sequelize.DOUBLE,
    allowNull:false,
},
image:{
    type:sequelize.STRING(200),
    allowNull:true,
},
description:{
    type:sequelize.STRING(300),
    allowNull:true
}
})

module.exports=Products;
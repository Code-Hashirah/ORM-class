const SequelizeDb=require('../database/connect');
const sequelize=require('sequelize');
const Users=SequelizeDb.define("users", {
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type:sequelize.STRING(35),
        unique:true,
        allowNull:false
    },
    phone:{
        type:sequelize.STRING(35),
        unique:true,
        allowNull:false
    },
    password:{
        type:sequelize.STRING(30),
        allowNull:false,
    }
})
module.exports=Users;
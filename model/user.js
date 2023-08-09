const SequelizeDb=require('../database/connect');
const {DataTypes}=require('sequelize');

const Users=SequelizeDb.define("users", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(35),
        unique:true,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING(35),
        unique:true,
        allowNull:false
    },
    role:{
        type:DataTypes.CHAR(20),
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING(30),
        allowNull:false,
    },
    resetToken:DataTypes.STRING,
    resetTokenExpiration:DataTypes.DATE
})
module.exports=Users;
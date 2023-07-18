const Sequelize = require('sequelize');
const connect = new  Sequelize('sequelizeDb', "root", '',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=connect;
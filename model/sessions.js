const Sequelize=require('../database/connect');
const sequelize=require('sequelize');
// Define your Sequelize model for session storage
const session = Sequelize.define('session', {
    sid: {
      type: sequelize.STRING,
      primaryKey: true,
    },
    userId:{
      type:sequelize.STRING
    },
    data: {
      type: sequelize.TEXT,
    },
    expires: {
      type: sequelize.DATE,
    },
  });

  module.exports=session;
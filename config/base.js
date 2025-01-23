const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'base.sqlite'
}) ;

module.exports = sequelize;
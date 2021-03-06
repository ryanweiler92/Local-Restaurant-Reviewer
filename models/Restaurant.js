const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Restaurant extends Model {

};

Restaurant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cuisine: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price_range: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'restaurant'
      }
);

module.exports = Restaurant;
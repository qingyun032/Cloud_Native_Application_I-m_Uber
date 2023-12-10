const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Stops = require('./Stops');
const Users = require('./Users');

module.exports = ((sequelize, DataTypes) => {
    const Favor = sequelize.define('Favor', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        GO_start: DataTypes.INTEGER,
        GO_dest: DataTypes.INTEGER,
        BACK_start: DataTypes.INTEGER,
        BACK_dest: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Favor.belongsTo(Users, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
    });

    Favor.belongsTo(Stops, {
        foreignKey: 'GO_start'
    });

    Favor.belongsTo(Stops, {
        foreignKey: 'GO_dest'
    });

    Favor.belongsTo(Stops, {
        foreignKey: 'BACK_start'
    });

    Favor.belongsTo(Stops, {
        foreignKey: 'BACK_dest'
    });

    return Favor;
})(sequelize, DataTypes);

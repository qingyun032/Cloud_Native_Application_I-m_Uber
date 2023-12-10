const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users'); // Assuming Users is another defined model

module.exports = ((sequelize, DataTypes) => {
    const Favor = sequelize.define('Favor', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        P_GO_start: {
            type: DataTypes.STRING(255),
        },
        P_GO_cnt: {
            type: DataTypes.INTEGER,
        },
        P_GO_TIME: {
            type: DataTypes.TIME,
        },
        P_BACK_dest: {
            type: DataTypes.STRING(255),
        },
        P_BACK_cnt: {
            type: DataTypes.INTEGER,
        },
        P_BACK_TIME: {
            type: DataTypes.TIME,
        },
        D_GO_start: {
            type: DataTypes.STRING(255),
        },
        D_GO_TIME: {
            type: DataTypes.TIME,
        },
        D_GO_stops: {
            type: DataTypes.STRING(255),
        },
        D_BACK_dest: {
            type: DataTypes.STRING(255),
        },
        D_BACK_TIME: {
            type: DataTypes.TIME,
        },
        D_BACK_stops: {
            type: DataTypes.STRING(255),
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Favor.belongsTo(Users, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
    });

    return Favor;
})(sequelize, DataTypes);

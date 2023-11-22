const DataTypes = require('sequelize');
const sequelize = require('../../config/database');

const Wallet = sequelize.define('Wallet', {
    walletID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    balance: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

module.exports = Wallet;

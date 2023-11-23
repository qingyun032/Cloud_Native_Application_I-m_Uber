const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const CarInfo = require('./CarInfo')
const Wallet = require('./Wallet')
module.exports = ((sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        isDriver: DataTypes.ENUM('YES', 'NO'),
        gender: DataTypes.ENUM('M', 'F'),
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        nCancel: DataTypes.INTEGER,
        walletID: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        carPlate: DataTypes.STRING
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    User.belongsTo(CarInfo, { foreignKey: 'carPlate' });
    User.belongsTo(Wallet, { foreignKey: 'walletID' });
    return User;
})(sequelize, DataTypes);

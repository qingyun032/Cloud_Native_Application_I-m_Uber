const DataTypes = require('sequelize');
const sequelize = require('../../config/database');

module.exports = ((sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        isDriver: DataTypes.ENUM('YES', 'NO'),
        gender: DataTypes.ENUM('M', 'F'),
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        cancel_t: DataTypes.INTEGER
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    // User.hasOne(sequelize.models.CarInfo, { foreignKey: 'driver_id' });
    // User.hasOne(sequelize.models.Wallet, { foreignKey: 'user_id' });
    return User;
})(sequelize, DataTypes);

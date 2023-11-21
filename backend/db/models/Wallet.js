const DataTypes = require('sequelize');
const sequelize = require('../../config/database');

module.exports = ((sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        Creditcard_Num: DataTypes.INTEGER
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    // Wallet.belongsTo(sequelize.models.Users, { foreignKey: 'user_id' });
    return Wallet;
})(sequelize, DataTypes);

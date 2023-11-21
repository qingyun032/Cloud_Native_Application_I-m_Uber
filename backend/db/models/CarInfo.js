const DataTypes = require('sequelize');
const sequelize = require('../../config/database');

module.exports = ((sequelize, DataTypes) => {
    const CarInfo = sequelize.define('CarInfo', {
        driver_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        plate: DataTypes.STRING,
        seat: DataTypes.INTEGER,
        brand: DataTypes.STRING,
        color: DataTypes.STRING,
        electric: DataTypes.ENUM('YES', 'NO')
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    // CarInfo.belongsTo(sequelize.models.Users, { foreignKey: 'driver_id' });
    return CarInfo;
})(sequelize, DataTypes);

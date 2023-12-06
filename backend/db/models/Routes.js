const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Users = require('./Users')
const Boarding = require('./Boarding');

module.exports = ((sequelize, DataTypes) => {
    const Routes = sequelize.define('Routes', {
        routeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        driverID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // This is a reference to another model
                key: 'userID', // This is the column name of the referenced model
            }
        },
        startTime: DataTypes.DATE,
        start: DataTypes.INTEGER, // start stop
        destination: DataTypes.INTEGER, // end stop
        available: DataTypes.INTEGER, // number of available seats
        state: DataTypes.ENUM("PROCESSING", "COMFIRMED"), // PROCESSING: the route is still open for passengers to join
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });    
    Routes.belongsTo(Users, { foreignKey: 'driveID' });
    Routes.hasMany(Boarding, { 
        foreignKey: 'routeID', 
        onDelete: 'cascade'
    });
    return Routes;
})(sequelize, DataTypes);


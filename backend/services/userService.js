const User = require('../db/models/Users');
const CarInfo = require('../db/models/CarInfo');
const Wallet = require('../db/models/Wallet');
async function getAllUsers() {
    try {
        const users = await User.findAll({
            include: [
                CarInfo,
                Wallet
            ]
        });
        return users;
    } catch (error) {
        throw new Error('An error occurred while acquiring the user');
    }
}


async function getUserById(userId) {
    try {
        const user = await User.findByPk(userId, {
            include: [
                CarInfo,
                Wallet
            ],
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('An error occurred while acquiring the user');
    }
}


async function createUser(userData) {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new Error('An error occurred while creating the user');
    }
}


async function updateUser(userId, userData) {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        for (const property in user["dataValues"]) {            
            if(userData[property]){
                user[property] = userData[property];
            }
                
        }
       
        await user.save();
        return user;
    } catch (error) {
        throw new Error('An error occurred while updating the user');
    }
}


async function deleteUser(userId) {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the user.');
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

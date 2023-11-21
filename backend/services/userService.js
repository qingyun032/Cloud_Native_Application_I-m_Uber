const User = require('../db/models/Users');
// const CarInfo = require('../db/models/carInfo')


async function getAllUsers() {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error('An error occurred while acquiring the user');
    }
}


async function getUserById(userId) {
    try {
        const user = await User.findByPk(userId);
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
        
        user.username = userData.username;
        user.password = userData.password;
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

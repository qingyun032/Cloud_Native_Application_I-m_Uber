const userService = require('../services/userService');


async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


async function getUserById(req, res) {
    const userId = req.session.userId;
    if(!userId){
        res.status(500).json({ error: "Please sign in before querying user data"})
        return;
    }

    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


async function createUser(req, res) {
    const userData = req.body;

    try {
        const user = await userService.createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


async function updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    try {
        const user = await userService.updateUser(userId, userData);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


async function deleteUser(req, res) {
    const userId = req.params.id;

    try {
        await userService.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

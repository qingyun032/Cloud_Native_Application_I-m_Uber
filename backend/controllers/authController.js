const authService = require('../services/authService');

// Controller function to handle user registration
async function signup(req, res) {
    const userData = req.body;

    try {
        // Call the signup service function to register the user
        const user = await authService.signup(userData, req);

        // Respond with the registered user's information
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// Controller function to handle user login
async function signin(req, res) {
    const credentials = req.body;

    try {
        // Call the signin service function to log in the user
        const message = await authService.signin(credentials, req);

        // Respond with a success message (e.g., "Login successful")
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    signup,
    signin,
};

const User = require('../db/models/Users');
const CarInfo = require('../db/models/CarInfo');
const Wallet = require('../db/models/Wallet');
const bcrypt = require('bcrypt');

// Service function to register a new user
async function signup(userData, req) {
    try {
        // Execute business logic for user registration here
        // For example, create a new user record and hash the password
        // Return the created user information
        // This is a simplified example; actual business logic may be more complex

        // Create the user and hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        console.log(userData);
        const user = await User.create({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            isDriver: userData.isDriver,
            gender: userData.gender,
            phone: userData.phone,
            address: userData.address,
            cancel_t: 0
        });

        // Set the user's session variable
        req.session.userId = user.id;

        return user;
    } catch (error) {
        throw new Error('Error occurred while registering the user');
    }
}

// Service function to log in a user
async function signin(credentials, req) {
    try {
        // Execute business logic for user login here
        // For example, validate user information and generate an authentication token
        // Return the generated token
        // This is a simplified example; actual business logic may be more complex

        const { id, password } = credentials;
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User does not exist');
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Set the user's session variable
        req.session.userId = user.id;

        return 'Login successful';
    } catch (error) {
        throw new Error('Error occurred while logging in');
    }
}

module.exports = {
    signup,
    signin,
};

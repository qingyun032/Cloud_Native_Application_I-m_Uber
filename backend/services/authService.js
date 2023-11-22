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
        const user = await User.create({
            userName: userData.userName,
            email: userData.email,
            password: hashedPassword,
            isDriver: userData.isDriver,
            gender: userData.gender,
            phone: userData.phone,
            address: userData.address,
            rating: userData.rating,
            carPlate: userData.carPlate,
            walletID: userData.walletID,
            nCancel: 0
        });
        await Wallet.create({
            walletID: userData.walletID,
            balance: 0
        })
        if(userData.isDriver == 'YES'){
            await CarInfo.create({
                carPlate: userData.carPlate,
                seat: userData.seat,
                brand: userData.brand,
                color: userData.color,
                electric: userData.electric
            });
        }
        // Set the user's session variable
        req.session.userId = user.userID;

        return "Sign up successfully";
    } catch (error) {
        throw error;
    }
}

// Service function to log in a user
async function signin(credentials, req) {
    try {
        // Execute business logic for user login here
        // For example, validate user information and generate an authentication token
        // Return the generated token
        // This is a simplified example; actual business logic may be more complex

        const { email, password } = credentials;
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error('User does not exist');
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Set the user's session variable
        req.session.userId = user.userID;

        return 'Login successful';
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signup,
    signin,
};

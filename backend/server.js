const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const carInfoRouter = require('./routes/carInfo');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
dotenv.config();

const app = express()

app.use(cors())
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/carInfo', carInfoRouter);
app.use('/api/v1/users', userRouter);

sequelize.sync()
    .then(() => {
        console.log('Database and tables have been created!');
        
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

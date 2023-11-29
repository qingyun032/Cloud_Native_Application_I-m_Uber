-- Create a new database
CREATE DATABASE IF NOT EXISTS myUber_database;

-- Switch to the newly created database
USE myUber_database;

-- Create a users table
CREATE TABLE IF NOT EXISTS Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(31),
    email VARCHAR(31),
    `password` VARCHAR(255),
    isDriver ENUM('YES', 'NO'),
    gender ENUM('M', 'F'),
    phone VARCHAR(31),
    addressHome VARCHAR(127),
    addressCompany VARCHAR(127),
    nCancel INT,
    ratingTotalScore INT,
    nRating INT,
    carPlate VARCHAR(15)
);

Create TABLE IF NOT EXISTS CarInfo(
    carPlate VARCHAR(15) PRIMARY KEY,
    seat INT,
    brand INT,
    color INT,
    electric ENUM('YES', 'NO')
);

Create TABLE IF NOT EXISTS Wallet(
    userID INT PRIMARY KEY,
    balance INT,
    -- Creditcard_Num VARCHAR(255),
    FOREIGN KEY(userID) REFERENCES Users(userID) ON DELETE CASCADE
);

Create TABLE IF NOT EXISTS Stops(
    stopID INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(63),
    `address` VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8)
);

Create TABLE IF NOT EXISTS Reocrd(
    reocrdID INT PRIMARY KEY,
    userID INT,
    `date` DATETIME,
    `start` INT,
    destination INT,
    price INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(`start`) REFERENCES Stops(stopID),
    FOREIGN KEY(destination) REFERENCES Stops(stopID)
);

-- Insert some data into the table
-- INSERT INTO users (username, email) VALUES
--     ('john_doe', 'john@example.com'),
--     ('jane_doe', 'jane@example.com');

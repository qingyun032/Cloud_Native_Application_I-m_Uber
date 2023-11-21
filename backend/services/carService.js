const Car = require('../db/models/car');


async function getAllCars() {
    try {
        const cars = await Car.findAll();
        return cars;
    } catch (error) {
        throw new Error('An error occurred while retrieving the vehicle');
    }
}


async function getCarById(carId) {
    try {
        const car = await Car.findByPk(carId);
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    } catch (error) {
        throw new Error('An error occurred while retrieving the vehicle');
    }
}


async function createCar(carData) {
    try {
        const car = await Car.create(carData);
        return car;
    } catch (error) {
        throw new Error('An error occurred while creating the vehicle');
    }
}


async function updateCar(carId, carData) {
    try {
        const car = await Car.findByPk(carId);
        if (!car) {
            throw new Error('Car not found');
        }
        
        car.make = carData.make;
        car.model = carData.model;
        car.year = carData.year;
        await car.save();
        return car;
    } catch (error) {
        throw new Error('An error occurred while updating the vehicle');
    }
}


async function deleteCar(carId) {
    try {
        const car = await Car.findByPk(carId);
        if (!car) {
            throw new Error('Car not found');
        }
        await car.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the vehicle');
    }
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};

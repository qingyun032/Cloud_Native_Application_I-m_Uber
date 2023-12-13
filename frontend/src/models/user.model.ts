import { AlertColor } from "@mui/material";

export type userSignIn = {
    userName: string;
    password: string;
};

// to be modified after confirmation with backend
export type userSignUp = {
    userName: string;
    email: string;
    password: string;
    isDriver: boolean;
    gender: string;
    phone: string;
    carPlate: string;
    addressHome: string;
    addressCompany: string;
    seat: number;
    brand: number;
    color: number;
    electric: boolean;
    type: string;
}

type passengerRoute = {
    address: string,
    passengerCnt: number,
    time: string
}

type driverRoute = {
    address: string,
    time: string,
    stopIDs: Array<number>,
    stopNames: Array<string>
}

export type favRoute = {
    passenger: {
        Go: passengerRoute,
        Back: passengerRoute
    },
    driver: {
        Go: driverRoute,
        Back: driverRoute
    }
};

export type car = {
    brand: number,
    type: string,
    seat: number,
    license: string // to be changed to carPlate
    color: number,
    electric: boolean
};

export enum userMode {
    Passenger = "passenger",
    Driver = "driver"
}

export type userInfo = {
    name: string,
    email: string,
    phone: string,
    gender: string,
    home: string,
    company: string,
    wallet: number,
    driver: boolean,        // Whether driver is verified
    mode: userMode,         // Which mode is this user use (userMode.Passenger/userMode.Driver)
    favRoute: favRoute,
    car: car,
    nCancel: number,
    rating: string,
};

export type infoBarType = {
    open: boolean,
    type: AlertColor,
    message: string,
}
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
    brand: string,
    type: string,
    seat: string,
    license: string // to be changed to carPlate
    color: number,
    electric: boolean
};

export enum userMode {
    Passenger = "passenger",
    Driver = "driver"
}

// previous version of userInfo
// export type userInfo = {
//     userName: string,
//     email: string,
//     phone: string,
//     gender: string,
//     addressHome: string,
//     addressCompany: string,
//     nCancel: number,
//     rating: number,
//     wallet: number,
//     isDriver: boolean,        // Whether driver is verified
//     mode: userMode,         // Which mode is this user use (userMode.Passenger/userMode.Driver)
//     favRoute: favRoute,
//     CarInfo: car,
// };

// export type userInfo = {
//     name: string,
//     email: string,
//     phone: string,
//     gender: string,
//     home: string,
//     company: string,
//     wallet: string,
//     driver: boolean,        // Whether driver is verified
//     mode: userMode,         // Which mode is this user use (userMode.Passenger/userMode.Driver)
//     favRoute: favRoute,
//     car: car
// };

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
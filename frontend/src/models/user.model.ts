export type passenger = {
    userName: string;
    isMale: boolean;
    // to be added
};

export type driver = {
    userName: string;
    isMale: boolean;
    // to be added
};

export type favRoute = {
    passenger: {
        start: string,
        destination: string,
        time: string,
        people: string,
    },
    driver: {
        start: string,
        destination: string,
        time: string,
        stops: Array<string>,
    }
};
  
export type car = {
    brand: string,
    type: string,
    seat: string,
    license: string
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
    wallet: string,
    driver: boolean,        // Whether driver is verified
    mode: userMode,         // Which mode is this user use (userMode.Passenger/userMode.Driver)
    favRoute: favRoute,
    car: car
};

export type user = {
    password: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    home: string;
    company: string;
}
  
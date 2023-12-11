const app = require('../server');
const request = require('supertest');
const User = require('../db/models/Users');
const CarInfo = require('../db/models/CarInfo');
const Wallet = require('../db/models/Wallet');
const Routes = require('../db/models/Routes');
const Boarding = require('../db/models/Boarding');
const sequelize = require('../config/database');
const transformAddr = require('../utils/transformAddr');
const axios = require('axios');
jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);
const boardingService = require('../services/boardingService');

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    })
}

beforeAll(async () => {
    console.log("sleep starts...");
    await sleep(2500)
    console.log("sleep ends...");
});

describe("POST /api/v1/auth/signup", () => {
    test("Sign up user1", async () => {
        // Clear Data
        await User.destroy({
            truncate: {cascade: true}
        });
        await sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1;');
        await CarInfo.destroy({
            truncate: true
        });
        await Wallet.destroy({
            truncate: true
        });
        await Routes.destroy({
            truncate: {cascade: true}
        });
        await sequelize.query('ALTER TABLE Routes AUTO_INCREMENT = 1;');
        await sequelize.query('ALTER TABLE Boarding AUTO_INCREMENT = 1;');
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "password": "Leopassword",
            "isDriver": true,
            "gender": "M",
            "phone": "0912-345-678",
            "carPlate": "ABCD-8349",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "seat": 4,
            "brand": 2,
            "type": "SUV",
            "color": 1,
            "electric": true
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
    test("Sign up user2", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Chu",
            "email": "chu@gamil.com",
            "password": "Chupassword",
            "isDriver": false,
            "gender": "M",
            "phone": "0912-345-678",
            "addressHome": "106台北市大安區和平東路三段60號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
    test("Sign up user3", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Wei",
            "email": "wei@tsmc.com",
            "password": "Weipassword",
            "isDriver": true,
            "gender": "M",
            "phone": "0987-654-321",
            "carPlate": "BBC-1221",
            "addressHome": "新竹市光復路二段101號",
            "addressCompany": "新竹科學園區新竹市力行六路8號",
            "seat": 4,
            "brand": 1,
            "type": "SUV",
            "color": 2,
            "electric": false
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
    test("Sign up user4", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Alice",
            "email": "alice@tsmc.com",
            "password": "Alicepassword",
            "isDriver": false,
            "gender": "F",
            "phone": "0950-952-361",
            "addressHome": "新竹市寶山路1號",
            "addressCompany": "新竹科學園區新竹市力行六路8號",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
    test("Sign up user4", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Bob",
            "email": "bob@tsmc.com",
            "password": "Bobpassword",
            "isDriver": false,
            "gender": "M",
            "phone": "0959-934-954",
            "addressHome": "新竹市光復路一段23號",
            "addressCompany": "新竹科學園區新竹市力行六路8號",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
    test("Sign up user4", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Candy",
            "email": "candy@tsmc.com",
            "password": "Candypassword",
            "isDriver": false,
            "gender": "F",
            "phone": "0965-789-024",
            "addressHome": "新竹市明湖路1101號",
            "addressCompany": "新竹科學園區新竹市力行六路8號",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
});

describe("POST /api/v1/auth/signin", () => {
    test("Should log in successfully", async () => {
        const res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login successful");
    });
});

describe("POST /api/v1/auth/signout", () => {
    test("Shoud sign out successfully", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        console.log([...header["set-cookie"]]);
        let res = await request(app).post("/api/v1/auth/signout").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Logout successfully");
    });
});

describe("GET /api/v1/users/myInfo", () => {
    test("Get user1's infomation", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = loginRes;
        const res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "nCancel": 0,
            "rating": "0.0",
            "CarInfo": {
                "carPlate": "ABCD-8349",
                "seat": 4,
                "brand": 2,
                "type": "SUV",
                "color": 1,
                "electric": true
            },
            "Wallet": {
                "balance": 0
            }
        });
    });
    test("Get user2's infomation", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        const { header } = loginRes;
        const res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "userName": "Chu",
            "email": "chu@gamil.com",
            "isDriver": false,
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區和平東路三段60號",
            "nCancel": 0,
            "rating": "0.0",
            "CarInfo": null,
            "Wallet": {
                "balance": 0
            }
        });
    });
});

describe("POST /api/v1/users/rating", () => {
    test("Shoud rating successfully", async () => {
        let res = await request(app).post("/api/v1/users/rating").send({
            "driverID": 1,
            "rating": 4
        });
        expect(res.body.message).toBe("Rating successfully");
        res = await request(app).post("/api/v1/users/rating").send({
            "driverID": 1,
            "rating": 2
        });
        expect(res.body.message).toBe("Rating successfully");
        res = await request(app).post("/api/v1/users/rating").send({
            "driverID": 1,
            "rating": 3
        });
        expect(res.body.message).toBe("Rating successfully");
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = loginRes;
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "nCancel": 0,
            "rating": "3.0",
            "CarInfo": {
                "carPlate": "ABCD-8349",
                "seat": 4,
                "brand": 2,
                "type": "SUV",
                "color": 1,
                "electric": true
            },
            "Wallet": {
                "balance": 0
            }
        });
    });
});

describe("PUT /api/v1/users/updatePassenger", () => {
    test("Update user2's infomation to driver", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updatePassenger").set("Cookie", [...header["set-cookie"]]).send({
            "email": "Imchuchu@gamil.com",
            "gender": "M",
            "phone": "0912-345-678",
            "addressHome": "106台北市大安區和平東路三段410號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update passenger successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userName": "Chu",
            "email": "Imchuchu@gamil.com",
            "isDriver": false,
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區和平東路三段410號",
            "nCancel": 0,
            "rating": "0.0",
            "CarInfo": null,
            "Wallet": {
                "balance": 0
            }
        });
    });
});

describe("PUT /api/v1/users/updateDriver", () => {
    test("Sign up driver from passenger", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateDriver").set("Cookie", [...header["set-cookie"]]).send({
            "email": "driverchuchu@gamil.com",
            "gender": "M",
            "phone": "0933-444-555",
            "addressHome": "106台北市大安區和平東路三段410號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "carPlate": "LOVE-9888",
            "color": 4,
            "brand": 3,
            "type": "Sedan",
            "electric": false,
            "seat": 3
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userName": "Chu",
            "email": "driverchuchu@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0933-444-555",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區和平東路三段410號",
            "nCancel": 0,
            "rating": "0.0",
            "CarInfo": {
                "carPlate": "LOVE-9888",
                "seat": 3,
                "brand": 3,
                "type": "Sedan",
                "color": 4,
                "electric": false
            },
            "Wallet": {
                "balance": 0
            }
        });
    });
    test("Update driver's infomation without changing carPlate", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateDriver").set("Cookie", [...header["set-cookie"]]).send({
            "email": "leo@gamil.com",
            "gender": "M",
            "phone": "0987-654-321",
            "addressHome": "106台北市大安區基隆路四段43號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "carPlate": "ABCD-8349",
            "color": 10,
            "brand": 12,
            "type": "SUV",
            "electric": false,
            "seat": 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0987-654-321",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區基隆路四段43號",
            "nCancel": 0,
            "rating": "3.0",
            "CarInfo": {
                "carPlate": "ABCD-8349",
                "seat": 2,
                "brand": 12,
                "type": "SUV",
                "color": 10,
                "electric": false
            },
            "Wallet": {
                "balance": 0
            }
        });
    });
    test("Update driver's infomation with changing carPlate", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateCarInfo").set("Cookie", [...header["set-cookie"]]).send({
            "email": "leo@gamil.com",
            "gender": "M",
            "phone": "0987-654-321",
            "addressHome": "106台北市大安區基隆路四段43號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "carPlate": "OKDR-1111",
            "color": 10,
            "brand": 12,
            "type": "Sedan",
            "electric": false,
            "seat": 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0987-654-321",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區基隆路四段43號",
            "nCancel": 0,
            "rating": "3.0",
            "CarInfo": {
                "carPlate": "OKDR-1111",
                "seat": 2,
                "brand": 12,
                "type": "Sedan",
                "color": 10,
                "electric": false
            },
            "Wallet": {
                "balance": 0
            }
        });
    });
});


describe("PUT /api/v1/users/updateCarInfo", () => {
    test("Update carInfo without changing carPlate", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateDriver").set("Cookie", [...header["set-cookie"]]).send({
            "carPlate": "OKDR-1111",
            "color": 2,
            "brand": 4,
            "type": "Sedan",
            "electric": true,
            "seat": 3
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0987-654-321",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區基隆路四段43號",
            "nCancel": 0,
            "rating": "3.0",
            "CarInfo": {
                "carPlate": "OKDR-1111",
                "color": 2,
                "brand": 4,
                "type": "Sedan",
                "electric": true,
                "seat": 3
            },
            "Wallet": {
                "balance": 0
            }
        });
    });
    test("Update carInfo with changing carPlate", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateCarInfo").set("Cookie", [...header["set-cookie"]]).send({
            "carPlate": "LK99-8917",
            "color": 1,
            "brand": 1,
            "type": "SUV",
            "electric": true,
            "seat": 4
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0987-654-321",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區基隆路四段43號",
            "nCancel": 0,
            "rating": "3.0",
            "CarInfo": {
                "carPlate": "LK99-8917",
                "color": 1,
                "brand": 1,
                "type": "SUV",
                "electric": true,
                "seat": 4
            },
            "Wallet": {
                "balance": 0
            }
        });
    });
})

describe("PUT /api/v1/wallet/topUp", () => {
    test("Provide top up service", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/wallet/topUp").set("Cookie", [...header["set-cookie"]]).send({
            "cash": 300
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "balance": 300
        });

        res = await request(app).put("/api/v1/wallet/topUp").set("Cookie", [...header["set-cookie"]]).send({
            "cash": 12333
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "balance": 12633
        });
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0987-654-321",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區基隆路四段43號",
            "nCancel": 0,
            "rating": "3.0",
            "CarInfo": {
                "carPlate": "LK99-8917",
                "color": 1,
                "brand": 1,
                "type": "SUV",
                "electric": true,
                "seat": 4
            },
            "Wallet": {
                "balance": 12633
            }
        });
    });
})

describe("Test transformAddr", () => {
    test("Should return lat and lon object", async () => {
        mockedAxios.get.mockResolvedValue({
            "data": {
                "results": [
                    {
                        "position": {
                            "lat": 25.01626,
                            "lon": 121.5333
                        },
                    },
                ]
            }
        });
        const postion = await transformAddr("台北市大安區羅斯福路四段1號");
        expect(postion).toEqual({
            "lat": 25.01626,
            "lon": 121.5333
        });
    });
})

// describe("createBoarding", () => {
//     test("Create a boarding", async () => {
//         Routes.destroy({
//             truncate: {cascade: true}
//         });
        
//         const boardingData = {
//             "routeID": 1,
//             "stopID": 9,
//             "boardTime": "2021-06-01 11:00:00:000Z",
//         }

//         const boarding = await boardingService.createBoarding(boardingData);
//         console.log(boarding);
//         expect(boarding).toEqual({
//             "boardingID": 9,
//             "routeID": 1,
//             "stopID": 20,
//             "boardTime": "2021-06-01T11:00:00.000Z",
//         });
//     });
// })

describe("POST /api/v1/route/createRoute", () => {

    test("Try to create a route without authentication", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "LeoM",
            "password": "LeoWrongpassword"
        });
        const { header } = res;
        res = await request(app).post("/api/v1/route/createRoute").send({
            "startTime": '2021-06-01 11:00:00:000Z',
            "stopIds": [1, 2, 3, 4, 5, 6, 7, 9],
            "available": 3,
            "type": "GO",
            "state": "PROCESSING"
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe("Please sign in before querying driver data");
    });
    
    test("Try to create a route with invalid data", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;
        res = await request(app).post("/api/v1/route/createRoute").set("Cookie", [...header["set-cookie"]]).send({
            "startTime": '2021-06-01 11:00:00:000Z',
            "stopIds": [1, 9],
            "available": 3,
            "type": "GO",
            "state": "PROCESSING"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("You should include at least 1 intermediate stop");

    });

    test("Create a route successfully", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;
        res = await request(app).post("/api/v1/route/createRoute").set("Cookie", [...header["set-cookie"]]).send({
            "startTime": '2021-06-01 11:00:00:000Z',
            "stopIds": [1, 2, 3, 4, 5, 6, 7, 9],
            "available": 3,
            "type": "GO",
            "state": "PROCESSING"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            "routeID": 1,
            "driverID": 1,
            "start": 1,
            "destination": 9,
            "startTime": "2021-06-01T11:00:00.000Z",
            "available": 3,
            "type": "GO",
            "state": "PROCESSING"
        });
    });

    test("Create multiple route successfully", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        const { header } = res;
        res = await request(app).post("/api/v1/route/createRoute").set("Cookie", [...header["set-cookie"]]).send({
            "startTime": '2023-12-21 08:23:00:000Z',
            "stopIds": [100, 200, 300, 456],
            "available": 4,
            "type": "GO",
            "state": "PROCESSING"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            "routeID": 2,
            "driverID": 2,
            "start": 100,
            "destination": 456,
            "startTime": "2023-12-21T08:23:00.000Z",
            "available": 4,
            "type": "GO",
            "state": "PROCESSING"
        });
    });
    // Add more test cases as needed
});





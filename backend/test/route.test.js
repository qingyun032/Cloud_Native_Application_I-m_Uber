const { app, server } = require('../server');
const request = require('supertest');
const User = require('../db/models/Users');
const CarInfo = require('../db/models/CarInfo');
const Routes = require('../db/models/Routes');
const sequelize = require('../config/database');
const axios = require('axios');
jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);


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

afterAll(async () => {
    server.close();
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
    
});

describe("GET /api/v1/route/showStops", () => {
    test("Case 1", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        mockedAxios.get.mockResolvedValue({
            "data": {
                "results": [
                    {
                        "position": {
                            "lat": 25.08216,
                            "lon": 121.57931
                        },
                    },
                ]
            }
        });
        let res = await request(app).get("/api/v1/route/showStops").query({
            "isGo": true,
            "address": "台北市內湖區麗山街68巷5號"
        }).set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            Stops: [
              {
                'Stop.stopID': 46,
                'Stop.Name': '國防醫學院',
                'Stop.address': '台北市民權東路六段161號前側'
              },
              {
                'Stop.stopID': 45,
                'Stop.Name': '三軍總醫院',
                'Stop.address': '台北市成功路二段424號(對面)'
              },
              {
                'Stop.stopID': 48,
                'Stop.Name': '捷運小巨蛋站(3號出口)',
                'Stop.address': '台北市南京東路四段12號前'
              },
              {
                'Stop.stopID': 43,
                'Stop.Name': '立法院台北會館',
                'Stop.address': '台北市博愛路217號旁'
              },
              {
                'Stop.stopID': 42,
                'Stop.Name': '植物園',
                'Stop.address': '台北市和平西路二段100號前'
              },
              {
                'Stop.stopID': 101,
                'Stop.Name': '國泰國小',
                'Stop.address': '新北市中正路386號'
              },
              {
                'Stop.stopID': 109,
                'Stop.Name': '鶯歌陶瓷博物館',
                'Stop.address': '新北市文化路200號(旁)'
              },
              {
                'Stop.stopID': 110,
                'Stop.Name': '二橋派出所',
                'Stop.address': '新北市高職西街/中正三路口(西北側)'
              },
              {
                'Stop.stopID': 25,
                'Stop.Name': '臺鐵上員車站',
                'Stop.address': '新竹縣公道路/光明路口(西側)'
              },
              {
                'Stop.stopID': 111,
                'Stop.Name': '台積電',
                'Stop.address': '新竹縣寶山鄉園區二路168號'
              }
            ]
          })
    })
    test("Case 2", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        mockedAxios.get.mockResolvedValue({
            "data": {
                "results": [
                    {
                        "position": {
                            "lat": 25.07433,
                            "lon": 121.44372
                        },
                    },
                ]
            }
        });
        let res = await request(app).get("/api/v1/route/showStops").query({
            "isGo": false,
            "address": "新北市五股區夏綠地街17-35號"
        }).set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            Stops: [
              {
                'Stop.stopID': 111,
                'Stop.Name': '台積電',
                'Stop.address': '新竹縣寶山鄉園區二路168號'
              },
              {
                'Stop.stopID': 25,
                'Stop.Name': '臺鐵上員車站',
                'Stop.address': '新竹縣公道路/光明路口(西側)'
              },
              {
                'Stop.stopID': 23,
                'Stop.Name': '新竹客運下公館站',
                'Stop.address': '新竹縣東寧路一段1號(北側)'
              },
              {
                'Stop.stopID': 108,
                'Stop.Name': '二橋虹橋公園',
                'Stop.address': '新北市中正三路400號(對面)'
              },
              {
                'Stop.stopID': 102,
                'Stop.Name': '山佳火車站',
                'Stop.address': '新北市山佳街47號(對面)'
              },
              {
                'Stop.stopID': 103,
                'Stop.Name': '樹林區公所',
                'Stop.address': '新北市博愛街198-5號對側'
              },
              {
                'Stop.stopID': 99,
                'Stop.Name': '福營行政中心',
                'Stop.address': '新北市四維路17號-20號'
              },
              {
                'Stop.stopID': 44,
                'Stop.Name': '國家音樂廳',
                'Stop.address': '台北市信義路一段(國家音樂廳西北側)'
              },
              {
                'Stop.stopID': 41,
                'Stop.Name': '中正運動中心',
                'Stop.address': '台北市信義路一段1號前'
              },
              {
                'Stop.stopID': 36,
                'Stop.Name': '臺北孔廟',
                'Stop.address': '台北市哈密街61號口對側人行道'
              }
            ]
          })
    })
});

# 2023_Fall_CloudNative_Group11
2023 Fall NTU CSIE course Cloud Native Application Development. 

We are group 11, working on the project "I'm Uber" for solving the problem: Carpooling Issues of TSMC employees.

## Note from chihung (11/07)
Since we have nothing currently, I just directly push the initial code to the main branch.
I think we should add dev branch for deveplopment. And every time we try to write code, we should do the following things. For example, if I am going to develop the sign in job, I should create the `feature/{your_branch_name}` from `dev`
```
git checkout -b feature/sign_in dev
```
After finishing the sign in job, I can just push it to the `feature/signIn` branch. Then I can start a pull request(for others to review code?), and merge the feature branch into dev branch.

Just let us know if you have any ideas. I haven't read the 12 factors yet. Not sure if we need to do other things like create test-feature branch for testing?

## Getting Started
## Frontend

### Installation
You should install [Node](https://nodejs.org/en) from the website first, then run this to install React.js.
```
npm i create-react-app
```

Installation for packages
```
cd frontend
npm install
```

Run
```
npm start // under frontend folder
```
Then you'll see the website in [http://localhost:3000](http://localhost:3000). If not, just open the link.

## Backend
### Requirement
node v20.9.0  
yarn v1.22.21
```bash=
npm install -g yarn@1.22.21
```


### Install Dependencies
```bash=
cd backend
yarn install
```

### Run
Create the server on the port 4000
```bash=
yarn server
```

Use curl command to test our server.
Ex:
```bash=
curl http://127.0.0.1:4000
```
You will get "hello world" from the server.

### set .env
You can define your own environment variables in backend/.env (Note that .env should not be pushed to the remote github)


### API
1. POST /api/v1/auth/signup
```json
{
    "userName": "Leo",
    "email": "leo@gamil.com",
    "password": "Leopassword",
    "isDriver": "YES",
    "gender": "M",
    "phone": "0912-345-678",
    "carPlate": "ABCD-8349",
    "walletID": "ESA9345XRW2WRT",
    "address": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
    "seat": 4,
    "brand": "BMW 320i",
    "color": 1,
    "electric": "YES"
}
```
2. POST /api/v1/auth/signin
```json
{
    "email": "leo@gamil.com",
    "password": "Leopassword"
}
```
3. GET /api/v1/users/myInfo
```json
{
    "userID": 32,
    "userName": "Leo",
    "email": "leo@gamil.com",
    "isDriver": "YES",
    "gender": "M",
    "phone": "0912-345-678",
    "address": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
    "nCancel": 0,
    "walletID": "ESA9345XRW2WRT",
    "rating": null,
    "carPlate": "ABCD-8349",
    "CarInfo": {
        "carPlate": "ABCD-8349",
        "seat": 4,
        "brand": "BMW 320i",
        "color": 1,
        "electric": "YES"
    },
    "Wallet": {
        "walletID": "ESA9345XRW2WRT",
        "balance": 0
    }
}
```
4. POST /api/v1/users/rating
```json
{
    "driverID": 32,
    "rating": 4.5
}
```

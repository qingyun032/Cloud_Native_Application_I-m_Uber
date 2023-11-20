import express from 'express'
import cors from 'cors'

const app = express()
const signupRoute = require('./Routes/signup')


// init middleware
app.use(cors())
app.use(express.json());
// define server

app.use('/api/v1/signup', signupRoute);

const port = process.env.PORT || 4000 
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`) 
})




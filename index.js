const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const useRoute = require('./routes/popular')
const authRoute = require('./routes/auth')
const latestRoute = require('./routes/latest')


var cors = require('cors');
app.use(cors());
app.use('/', express.static('uploads'))

dotenv.config()

mongoose.connect("mongodb://127.0.0.1:27017/MovieData")
    .then(() => console.log("dbConnnection successfull"))
    .catch((err) => {
        console.log(err)
    })

app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/getdata', authRoute)
app.use('/search', authRoute)
app.use('/movie', useRoute)
app.use('/latest',latestRoute)



app.listen(3000, () => {
    console.log("Server is running")
})
require('dotenv').config()

const express = require('express')

const workoutRouter = require('./routes/workoutRoutes')
const userRouter = require('./routes/userRoutes')

const mongoose = require('mongoose')


const app = express()


app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.static('dist'))

app.use('/api/workouts', workoutRouter)

app.use('/api/users', userRouter)


mongoose.connect(process.env.MONGO_URL)
    .then ( () => {
        app.listen(process.env.PORT, () => {
            console.log('server started at port: 4000, connected to MongoDB')
        })
    })
    .catch (err => {
        console.log(err)
    })


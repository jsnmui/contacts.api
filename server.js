const express = require('express')
require('dotenv').config() // init dotenv
const morgan = require('morgan')
const helmet = require('helmet')

const mongoConfig =require('./config/mongoConfig')
const contactsRouter = require('./routes/contactsRouter')
const usersRouter = require('./routes/usersRouter')

const app = express()
const PORT = 5000

app.use(express.json()) //parse into json file read from req.body data coming in
// * Routers
app.use(morgan('dev'))
app.use(helmet())

app.use('/contacts', contactsRouter)  // endpoint todos to todoRouter
app.use('/users', usersRouter)

//* Root route for the APP
app.get('/', (req, res) => {
    res.status(200).json('Welcome to my API')
})



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoConfig()
})
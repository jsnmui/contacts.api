const express = require('express')
require('dotenv').config() // init dotenv

const mongoConfig =require('./config/mongoConfig')
const todosRouter = require('./routes/todosRouter')

const app = express()
const PORT = 5000

app.use(express.json()) //parse into json file read from req.body data coming in
// * Routers
app.use('/todos', todosRouter)  // endpoint todos to todoRouter

//* Root route for the APP
app.get('/', (req, res) => {
    res.status(200).json('Welcome to my API')
})



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoConfig()
})
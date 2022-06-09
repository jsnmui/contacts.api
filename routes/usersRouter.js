const express = require('express')
const UserModel = require('../models/usersSchema')
// pulls out the two function we need from express validator
const {check, validationResult} = require('express-validator')

// * Create a Router
const router = express.Router()

router.get('/', async (req,res) => {

    try {
        const user = await UserModel.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
}


})
//* Create a new User
router.post('/', [
    check('username',"Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email! from middleware").isEmail(),
    check("password","Please enter a password").notEmpty(),
    check("password","Please enter a password with six or more characters").isLength({min:6})   
], async (req, res) => {
    const userData = req.body
   
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        const user = await UserModel.create(userData)
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!!!!!')
    }
})


//* GET Contacts BY ID
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await UserModel.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(400).json({
            msg: 'Id not found'
        })
    }
})


//* UPDATE Contacts BY ID
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newUserData = req.body
     try {
         //* find the todo by the id
         const user = await UserModel.findByIdAndUpdate(id, newUserData, {new: true})
         res.status(202).json(user)
     } catch (error) {
         console.log(error)
     }
})

//! DELETE A Contact
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const  user = await UserModel.findByIdAndDelete(id)
        res.status(200).json('User was deleted')
    } catch (error) {
        console.log(error);
    }
})



module.exports = router
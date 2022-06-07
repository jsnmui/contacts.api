const { response } = require('express')
const express = require('express')
const contactsModel =require('../models/contactSchema')
//* Create a Router
const router = express.Router()

//* Get Contacts
router.get('/', async (req,res) => {

    try {
        const contacts = await contactsModel.find()
        res.status(200).json(contacts)
    } catch (error) {
        console.log(error)
}


})

//* CREATE Contacts
router.post('/', async (req, res) => {
    const contactData = req.body // gets the data from the request
    // console.log(todoData)

    try {
        const contact = await contactsModel.create(contactData) // create the contact in the db
        // send back the response
        res.status(201).json(contact)
        // res.status(201).json({data: todo})
    } catch (error) {
        console.error(error)
        res.status(400).json('Bad request!!!!!')
    }
})

//* GET Contacts BY ID
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const contact = await contactsModel.findById(id)
        res.status(200).json(contact)
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
    const newContactData = req.body
     try {
         //* find the todo by the id
         const contact = await contactsModel.findByIdAndUpdate(id, newContactData, {new: true})
         res.status(202).json(contact)
     } catch (error) {
         console.log(error)
     }
})

//! DELETE A Contact
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const contact = await contactsModel.findByIdAndDelete(id)
        res.status(200).json( {msg: 'Contact was deleted'})
    } catch (error) {
        console.log(error);
    }
})



module.exports = router
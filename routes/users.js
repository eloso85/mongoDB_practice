const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', async(req, res)=>{
    try{
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message})
    } 
})

router.post('/', async(req, res)=>{
    const user = new User({
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})



module.exports = router
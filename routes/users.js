const express = require('express');
//const user = require('../models/user');
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
});


// Get one subscriber

router.get('/:id', getUser,(req, res)=>{
    res.json(res.user)
});

// Update one User
router.patch('/:id', getUser, async(req, res)=>{
    if(req.body.id != null){
        res.user.id = req.body.id
    }

    if(req.body.fname != null){
        res.user.fname = req.body.fname
    }
    if(req.body.lname != null){
        res.user.lname = req.body.lname
    }
    if(req.body.username != null){
        res.user.username = req.body.username
    }

    if(req.body.email != null){
        res.user.email = req.body.email
    }

    if(req.body.avatar != null){
        res.user.avatar = req.body.avatar
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
        
    }
});

// Delete one User
router.delete('/:id', getUser, async(req, res)=>{
    try {
       await res.user.remove()
       res.json({ message: " Deleted This User"}) 
    } catch (error) {
        res.status(500).json({ message: err.message})
    }
})

//This is the middle ware
async function getUser(req, res, next){
    try {
        user = await User.findById(req.params.id)
        if(user === null) {
            return res.status(404).json({ message: "Cant find User"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user
    
    next()
}






module.exports = router
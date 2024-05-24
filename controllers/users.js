
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
     const users = await User.find()

        res.render('users/index.ejs', {
            users: users
        })
    } catch (error) {
        res.send(error.message)
    }

})

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        pantry = user.pantry
        res.render('users/show.ejs', {
            user: user,
            pantry: pantry,
        })
    } catch (error) {
        res.send(error.message)
    }
})



module.exports = router;

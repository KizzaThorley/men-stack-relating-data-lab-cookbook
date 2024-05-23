// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

router.get('/', async (req, res) => {
    try {
        const userId = req.session.user._id
        const currentUser = await User.findById(userId)
        let pantry = currentUser.pantry
        res.render('foods/index.ejs', {
            pantry: pantry
        })
    } catch (error) {
        res.send(error.message)
    }

})

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
})
router.get('/:itemId/edit', async (req, res) => {
    try {
        const userId = req.session.user._id
        const currentUser = await User.findById(userId)
        const itemIdx = req.params.itemId
        let pantryItem = currentUser.pantry[itemIdx]
        res.render('foods/edit.ejs', {
            pantryItem: pantryItem,
            itemIdx: itemIdx,
        })
    } catch (error) {
        res.send(error.message)
    }
   
})


router.post('/', async (req, res) => {
    if (req.session.user) {
        try {
            const userId = req.session.user._id
            const currentUser = await User.findById(userId)
            currentUser.pantry.push(req.body)

            await currentUser.save()

            req.session.message = `Created Food`

            res.redirect(`/users/${userId}/foods/new`)
        } catch (error) {
            res.send(error.message)
        }
    }
})

router.delete('/:itemId', async (req, res) => {
    try {
        const userId = req.session.user._id
        const currentUser = await User.findById(userId)
        const pantry = currentUser.pantry.id(req.params.itemId)
        console.log(pantry);
        pantry.remove()
       await currentUser.save()
res.redirect(`/users/${userId}/foods`)
    } catch (error) {
        res.send(error.message)
    }
})

router.put('/:itemId/edit', async (req, res) => {
    try {
        
        const userId = req.session.user._id
        const currentUser = await User.findById(userId)
        const itemIdx = req.params.itemId
        // let pantryItem = currentUser.pantry[itemIdx]
        await currentUser.pantry.splice(itemIdx, 1, `${req.body.name.value}`)
        console.log(req.body.name);
        await currentUser.save()
        res.redirect(`/users/${userId}/foods/${itemIdx}`, {
            pantryItem: pantryItem,
            itemIdx: itemIdx,
        })

    } catch (error) {
        res.send(error.message)
    }
   
})
module.exports = router;

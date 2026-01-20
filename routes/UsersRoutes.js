const express = require('express');
const userModel = require('../models/User')
const router = express.Router();


router.post('/add', async (req, res) => {
    try {
        if (!req.query || Object.keys(req.query).length === 0) {
            return res.status(400).json({
                message: "Send JSON body from Thunder Client"
            });
        }

        const { name, password } = req.query;

        if (!name || !password) {
            return res.status(400).json({
                message: 'Name and password are required'
            });
        }

        const newUser = new userModel({ name, password });
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.get('/', async (req, res) => {
    console.log("Query : ", req.query)
    try {
        const { name, password } = req.query;
        let filter = {}
        if (name) filter.name = name;
        if (password) filter.password = password;
        const user = await userModel.find(filter)
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
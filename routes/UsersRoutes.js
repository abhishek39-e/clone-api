const express = require('express');
const userModel = require('../models/User')
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(400).json({
                message: 'Name and password is require'
            })

        }
        const existingUser = await userModel.findOne({ name })
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        const newUser = new userModel({
            name,
            password
        })
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully ✅",
            user: savedUser,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


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
})

module.exports = router;
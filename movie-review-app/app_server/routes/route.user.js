const express = require('express');
const router = express.Router();
const user = require('../controllers/controller.user.js');
const userModal = require('../models/model.user.js');

// Signup User
router.post('/signup', function (req, res) {
    const userForm = req.body;
    user.addUser(userForm, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error in Connecting to DB',
                status: false
            });
        }

        return res.json({
            status: true,
            data: result
        });
    });
});

//Login for Users
router.post('/login', function (req, res) {
    const { email } = req.body;
    const { password } = req.body;
    console.log(email, password);
    record = new userModal();
    user.login(email, function (err, result) {
        if (err) {
            return res
                .status(500)
                .json({ message: 'Error in Connecting to DB', status: false });
        } else if (result) {
            console.log(result.password);
            if (record.comparePassword(password, result.password)) {
                const result1 = result.toObject();
                result1.status = true;
                return res.json({
                    status: true,
                    message: 'Successfully Authenticated',
                    data: result
                });
            } else
                return res.json({ message: 'Wrong Password', status: false });
        } else {
            return res.json({ message: 'Wrong Email', status: false });
        }
    });
});

// Update User
router.patch('/update/:id', function (req, res) {
    const userId = req.params.id;
    const userForm = req.body;
    user.updateUser(userId, userForm, { new: true }, function (err, result) {
        if (err) {
            return res.status(500).json({
                message: 'Error in Connecting to DB',
                status: false
            });
        }
        return res.json({
            status: true,
            message: 'User updated successfully',
            data: result
        });
    });
});

module.exports = router;

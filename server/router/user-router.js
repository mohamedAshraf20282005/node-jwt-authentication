const express = require('express');
const router = express.Router();

// const verifyToken = require('../middleware/verifyToken');

const {getAllUsers, getUser, register, login} = require('../controller/user-controller');

router.get('/getAllUsers',getAllUsers,register);

router.get('/getUser',getUser);

router.post('/register',register);

router.post('/login',login);

module.exports = router;
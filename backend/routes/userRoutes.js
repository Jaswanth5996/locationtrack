const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser); // ✅ Fix here

module.exports = router;

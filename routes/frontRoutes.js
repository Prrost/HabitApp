const express = require("express");
const path = require("node:path");

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'profile.html'));
});



module.exports = router;
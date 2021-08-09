const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const dbConnection = require('../util/database');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'diary_list.html' ))
});






module.exports = router;
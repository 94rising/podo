const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'category.html' ))
});

router.get('/category', (req, res) => {
    const datas = [id, category, emotion];

    const sql = "SELECT * from DIARY WHERE id = ? and category = ? and emotion = ?";
    dbConnection.query(sql, datas, function (err, rows) {
        if(err){
            console.log(err);
        } else {
            console.log(rows.length);
            for(let i=0; i<rows.length; i++){
                console.log(rows[i]);
            }
        }
    });
});



router.post('/categoryAdd', (req, res) => {
    const datas = [id, category];

    const sql = "SELECT * from DIARY WHERE id = ? and category = ?";
    dbConnection.query(sql, datas, function (err, rows) {
        if(err){    
            console.log(err);
        } else {
            console.log(rows.length);
            for(let i=0; i<rows.length; i++){
                console.log(rows[i]);
            }
        }
    });
});


router.post('/categoryDelete', (req, res) => {
    const datas = [id, category];

    const sql = "SELECT * from DIARY WHERE id = ? and category = ?";
    dbConnection.query(sql, datas, function (err, rows) {
        if(err){
            console.log(err);
        } else {
            console.log(rows.length);
            for(let i=0; i<rows.length; i++){
                console.log(rows[i]);
            }
        }
    });
});

module.exports = router;
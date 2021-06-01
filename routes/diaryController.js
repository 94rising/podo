const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../util/database');

router.get('/', (req, res) => {
    const date = req.query.date;
    console.log(date);
    req.session.date = date;
    res.sendFile(path.join(__dirname ,'../views', 'diary.html' ));
});

router.get('/load', (req, res) => {
    //const id = req.session.id;
    const id = 'good';
    //const date = req.session.date;
    const date = '2021-05-29';
    const datas = [id, date];

    const sql = "SELECT * from DIARY WHERE id = ? and date = ?";
    dbConnection.query(sql, datas, function (err, rows) {
        if(err){
            console.log(err);
        } else {
            console.log(rows.length);
            for(let i=0; i<rows.length; i++){
                console.log(rows[i]); // row는 key:value 값 가짐
            }
        }
    });
});


router.post('/write', function(req,res,next){
    const diary = req.body.diary;
    const datas = [diary];
 
 
    const sql = "insert into DIARY(id, date, content, emotion, category) values(?, ?, ?, ?, ?)";
    conn.query(sql, datas, function (err, rows) {
        if (err) console.error("err : " + err);
    });
    res.redirect('/calendar');
});


 // dbConnection.query("INSERT INTO DIARY (content) VALUES (?)",[content], function (err, result) {  
  //   if (err) throw err;
  //   if {
  //     res.send({result:true});   
  //   } else {
  //     res.send({result:false});
  //   }
  // });


module.exports = router;




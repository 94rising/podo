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


router.get("/list", (req, res) => {
    if (req.session.userId === undefined) {
        res.redirect("/login");
        return;
    }

    res.sendFile(path.join(__dirname, '../views', 'diary_list.html'));
});

router.get("/listData", (req, res) => {
    const id = req.session.userId;
    const datas = [id];
    const sql = "SELECT * from DIARY WHERE id = ? ORDER BY date";
    let diaryList = [];
    // 동기 방식으로 변경하기
    dbConnection.query(sql, datas, function (err, rows) {
        if(err){
            console.log(err);
        } else {
            for(let i=0; i<rows.length; i++){
                diaryList.push(rows[i]); // row는 key:value 값 가짐
               console.log(diaryList); //이것만 읽힘
            } 
            
            const result = {diaryList};
            res.json(result);
        }
    });
    // const diary = {
    //     id: 'good',
    //     date: '2021-05-28',
    //     content: '오눌운 비ㅏ 온다',
    //     emotion: 1,
    //     category: 1
    //   };
    // diaryList.push(diary); //diary 말고 추가해야 할 것은? 

});



router.get('/load', (req, res) => {
    //const id = req.session.id;
    const id = 'good';
    const date = req.session.date;
  
    const datas = [id, date, emotion];
    const sql = "SELECT * from DIARY WHERE id = ? and date = ?";
    let diaryList = [];
    dbConnection.query(sql, datas, function (err, rows) {
        if(err){
            console.log(err);
        } else {
            for(let i=0; i<rows.length; i++){
                diaryList.push(rows[i]); // row는 key:value 값 가짐
            }
        }
    });

    const result = {diaryList, date};
    res.json(result);

});


router.post('/diary/write', function(req,res,next){
    const content = req.body.content;
    const date = req.session.date;
    const id = req.session.userId;
    const emotion = emotion;


    const datas = [id, date, content, emotion];
    //콘텐트 내용, 세션 date, 감정 저장해야함 
 
    const sql = "insert into DIARY(id, date, content, emotion) values(?, ?, ?, ?)";
    conn.query(sql, datas, function (err, rows) {
        if (err) console.error("err : " + err);
    });
    res.redirect('/');
});


 // dbConnection.query("INSERT INTO DIARY (id, date, content, emotion) VALUES (?)",[?,], function (err, result) {  
  //   if (err) throw err;
  //   if {
  //     res.send({result:true});   
  //   } else {
  //     res.send({result:false});
  //   }
  // });


module.exports = router;




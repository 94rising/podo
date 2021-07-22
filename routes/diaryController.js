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

router.post("/listData", (req, res) => {
    const id = req.session.userId;
    const offset = req.body.offset;
    const limit = req.body.limit;

    let diaryList = [];
    
        

    // 동기 방식으로 변경하기
    dbConnection.query("SELECT * from DIARY WHERE id = ? ORDER BY number LIMIT ?  offset ?  ;", [id, limit, offset], function (err, rows) {
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

});


// router.post("/dateListData", (req, res) => {
//     const id = req.session.userId;
//     const offset = req.body.offset;
//     const limit = req.body.limit;
//     const dateValue = req.body.dateValue
//     let diaryList = [];
//     let sql = '';
        
//     console.log('데이트리스트확인 :  ' + dateValue)
//     // 동기 방식으로 변경하기
//     if(dateValue == 1)  sql = "SELECT * from DIARY WHERE id = ? ORDER BY date ASC  LIMIT ?  offset ?  ;"
//     else sql = "SELECT * from DIARY WHERE id = ? ORDER BY date DESC  LIMIT ?  offset ?  ;"


//     dbConnection.query(sql, [id, limit, offset], function (err, rows) {
//         if(err){
//             console.log(err);
//         } else {
//             for(let i=0; i<rows.length; i++){
//                 diaryList.push(rows[i]); // row는 key:value 값 가짐
//                console.log(diaryList); //이것만 읽힘
//             } 
            
//             const result = {diaryList};
//             res.json(result);
//         }
//     });

// });


// router.post("/listEmotion", (req, res) => {
//     const id = req.session.userId;
//     const offset = req.body.offset;
//     const limit = req.body.limit;
//     const emotion = req.body.emotionValue;
//     let diaryList = [];
    
//     console.log( '확인 ' + emotion)
        

//     // 동기 방식으로 변경하기
//     dbConnection.query("SELECT * from DIARY WHERE id = ? ORDER BY number, emotion ? LIMIT ?  offset ?  ;", [id, emotion, limit, offset], function (err, rows) {
//         if(err){
//             console.log(err);
//         } else {
//             for(let i=0; i<rows.length; i++){
//                 diaryList.push(rows[i]); // row는 key:value 값 가짐
//                console.log(diaryList); //이것만 읽힘
//             } 
            
//             const result = {diaryList};
//             res.json(result);
//         }
//     });

// });







router.get('/load', (req, res) => {
    //const id = req.session.id;
    const id = req.session.userId
    const date = req.session.date;
    let result = '';
    

    let diaryList = [];
    dbConnection.query("SELECT * from DIARY WHERE id = ? ORDER BY date", [id, date], function (err, rows) {
        if(err){
            console.log(err);
        } else {
            for(let i=0; i<rows.length; i++){ 
                diaryList.push(rows[i]); // row는 key:value 값 가짐
                console.log('확인 : ' + i);
                 }
                 result = {diaryList, date};
                 console.log(result)
                 res.json(result);
             
               }
    });
 
});


router.post('/write', function(req,res){ 
    const content = req.body.content;
    const date =  req.session.date;
    const id = req.session.userId;
    //const emotion = emotion;
    //id와 date를 비교하여 해당 db가 있다면 update 아니면 insert 
    console.log('date화긴' + date)
    dbConnection.query("SELECT * FROM DIARY WHERE id = ? and date = ? ", [id, date], function (err, result) {

        if(err){
            console.log(err);
        } else {
            console.log('리절트확인' + result[0])

            if(result[0] == undefined)  { 
               //insert
                dbConnection.query("insert into DIARY(id, date, content) values(?, ?, ?)", [id, date, content], function (err, result) {
                    if (err) 
                    console.error("err : " + err);
                    else 
                    res.send({result: true})
                })}
    
             else {
                console.log('콘텐트확인 : ' + content)
                 //update 수정까지 가능함 // 새로운 글은 안돼 
                dbConnection.query( "update DIARY set content = ? where id= ? and date = ? ", [content, id, date], function(err,result){
                    if(err)
                        console.log(err);
                    else 
                    res.send({result: true})
                })}
                
            
            }})
})


 // dbConnection.query("INSERT INTO DIARY (id, date, content, emotion) VALUES (?)",[?,], function (err, result) {  
  //   if (err) throw err;
  //   if {
  //     res.send({result:true});   
  //   } else {
  //     res.send({result:false});
  //   }
  // });


module.exports = router;




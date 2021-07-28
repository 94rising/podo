const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../util/database');
const moment = require('moment');
const today = moment().format("YYYY-M-D");
console.log(today);


const { ComprehendClient, DetectSentimentCommand, DetectKeyPhrasesCommand  } = require("@aws-sdk/client-comprehend");
const config = {
 credentials:{
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
 },
 region: 'ap-northeast-2'
}

const client = new ComprehendClient(config);
let keyPhrasesObj;
let content2 ;
let keyPhrases1 = '';
let keyPhrases2 = '';
let keyPhrases3 = '';
let keyPhrases4 = '';
let keyPhrases5 = '';




router.get('/', (req, res) => {
    
    const date = req.query.date;
    console.log(date);
    req.session.date = date;
    res.sendFile(path.join(__dirname ,'../views', 'diary.html' ));
});



//다이어리 리스트
router.get("/list", (req, res) => { 
    if (req.session.userId === undefined) {
        res.redirect("/login");
        return;
    }

    res.sendFile(path.join(__dirname, '../views', 'diary_list.html'));
});

//다이어리 리스트 목록 조회
router.post("/listData", (req, res) => {
    const id = req.session.userId;
    const offset = req.body.offset;
    const limit = req.body.limit;
    let diaryList = [];
    
    const name = req.session.name

    // 동기 방식으로 변경하기
    dbConnection.query("SELECT * from DIARY WHERE id = ? ORDER BY number LIMIT ?  offset ?  ;", [id, limit, offset], function (err, rows) {
        if(err){
            console.log(err);
        } else {
            for(let i=0; i<rows.length; i++){
                diaryList.push(rows[i]); // row는 key:value 값 가짐
            //    console.log(diaryList); //이것만 읽힘
            } 
            
            const result = {diaryList, name};
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






//다이어리 작성부분 로드
router.get('/load', (req, res) => {
    //const id = req.session.id;
    const id = req.session.userId
    const date = req.session.date;
    const name = req.session.name
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
                 result = {diaryList, date, name};
                 console.log(result)
                 res.json(result);
             
               }
    });
 
});

//다이어리 작성
router.post('/write', async function (req,res){ 
    const content = req.body.content;
    const date =  req.session.date;
    const id = req.session.userId;
     content2 = req.body.content2;

    console.log(date, today);

    if(date !== today) {
        res.send({result : 'dayErr', today})
    }
    else{
    console.log('콘테느 확인:' +  content)
    console.log('콘테느 확인2:' +  content2)

    const comprehends = await comprehend(content2);
    
    const sentiment = comprehends.response.Sentiment
    const mixed = comprehends.response.SentimentScore.Mixed
    const negative = comprehends.response.SentimentScore.Negative
    const neutral = comprehends.response.SentimentScore.Neutral
    const positive = comprehends.response.SentimentScore.Positive
    keyPhrasesObj = comprehends.response3;


    keyPhrasesList(keyPhrasesObj);
    
    //const emotion = emotion;
    //id와 date를 비교하여 해당 db가 있다면 update 아니면 insert 
    console.log('date화긴' + date)
    dbConnection.query("SELECT * FROM DIARY WHERE id = ? and date = ? ", [id, date], function (err, result) {
        
        console.log('확인컴프'+ sentiment)
        console.log('확인컴프'+ keyPhrases2)

        if(err){
            console.log(err);
        } else {
            console.log('리절트확인' + result[0])

            if(result[0] == undefined)  { 
               //insert
                dbConnection.query("insert into DIARY(id, date, content, emotion, Mixed, Negative, Neutral, Positive, phrase1, phrase2, phrase3, phrase4, phrase5) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, date, content, sentiment, mixed, negative, neutral, positive, keyPhrases1, keyPhrases2, keyPhrases3, keyPhrases4, keyPhrases5], function (err, result) {
                    if (err) 
                    console.error("err : " + err);
                    else 
                    res.send({result: true})
                })}
    
             else {
                console.log('콘텐트확인 : ' + content)
                dbConnection.query( "update DIARY set content = ?, emotion = ?, Mixed = ?, Negative = ?, Neutral =?, Positive =?, phrase1 =?, phrase2 =?, phrase3 =?, phrase4 =?, phrase5=?  where id= ? and date = ? ", [content,sentiment, mixed, negative, neutral, positive, keyPhrases1, keyPhrases2, keyPhrases3, keyPhrases4, keyPhrases5, id, date], function(err,result){
                    if(err)
                        console.log(err);
                    else 
                    res.send({result: true})
                })}
                
            
            }})
}})


async function comprehend () {
    
    const input = {
       LanguageCode: 'ko',
       Text: content2
   }
   const command = new DetectSentimentCommand(input);
   const command2 = new DetectKeyPhrasesCommand(input);
   
   const response = await client.send(command);
   const response2 = await client.send(command2);
   
   console.log('test string => ', input.Text);
   console.log(response);
   console.log(response.Sentiment)
   console.log('\n\n\n=========================\n\n\n')
   console.log(response2);

   let response3;
   response3 = response2.KeyPhrases.sort(function (a, b) {
    return b.Text.length - a.Text.length;

   })


   console.log( response3)
   return {response, response2, response3}

   }



function keyPhrasesList () {

}




//    comprehends.response2.sort


//    for(int i = 0, i< 3, i++){


//     for(int j = i; j<3 ; j++){
//         if(comprehends.response2[i].Score < comprehends.response2[j].Score) 

//         {
//             int temp = i;
//             comprehends.response2[i].Score = comprehends.response2[j].Score;
//             comprehends.response2[j].Score = comprehends.response2[temp].Score;
//         }
//     }
// } 




// /    콘텐츠 ascii로 개행 띄어쓰기로 바꾸고 aws compre  사용 해야함 

// function aa () {
//     const content = req.body.content;

    
// }


function keyPhrasesList(keyPhrasesObj){



    if(keyPhrasesObj[0] !== undefined) keyPhrases1 = keyPhrasesObj[0].Text;
    else keyPhrases1 = '';
    if(keyPhrasesObj[1] !== undefined) keyPhrases2 = keyPhrasesObj[1].Text;
    else keyPhrases2 = '';
    if(keyPhrasesObj[2] !== undefined) keyPhrases3 = keyPhrasesObj[2].Text;
    else keyPhrases3 = '';
    if(keyPhrasesObj[3] !== undefined) keyPhrases4 = keyPhrasesObj[3].Text;
    else keyPhrases4 = '';
    if(keyPhrasesObj[4] !== undefined) keyPhrases5 = keyPhrasesObj[4].Text;
    else keyPhrases5 = '';

    return
}



module.exports = router;




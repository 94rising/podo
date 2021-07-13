const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const dbConnection = require('../util/database');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'diary_list.html' ))
});






// const testFolder = './data'; // 읽을 파일 디렉토리 경로 입력

// fs.readdir(testfolder, function(err, filelist) {
//     console.log(filelist);
// })



// router.post('/', (req, res) => {
//     const id = req.body.id;
//     const testFolder = './data'; // 읽을 파일 디렉토리 경로 입력
//     let i = 0;

//     dbConnection.query("SELECT * FROM diary WHERE id = ? and content = ?",[id, content], function (err, result) { //id가 DB에있는지 확인 
//       if (err) throw err; //err(error) : sql문 실행시키고 에러발생시 에러 출력/ 에러 없으면 NULL 값을 가짐
//       if (result[0] !== undefined) {

//         while(i < filelist.length){
//           list = list + `<li><a href="/?diary=${filelist[i]}">${filelist[i]}</a></li>`;
//           i = i + 1;
//         }
//         list = list+'</ul>';
//     } else { 
//         req.send.userid ({result:false})
//       }
//     });
// });


// sql 조회    https://extbrain.tistory.com/51
module.exports = router;
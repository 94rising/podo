const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');


router.get('/', (req, res) => {

});



router.get('/logout', function (req, res) {
const userId = req.session.userId;
const kakao = req.session.kakao
console.log('세션확인 :' + kakao)
// console.log('세션확인 :' + userId)
//     let result
//   req.session.destroy(function(err){
//     res.send({result : true});
// });



});
module.exports = router;

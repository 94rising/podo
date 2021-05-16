var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
  

var app = express()
  
app.use(session({ //사용자가 요청할때 session 함수 실행
  secret: 'pododo', //   
  resave: false, 
  saveUninitialized: true, // 세션이 필요할떄만 사용 , false 하면 항상 구동되어 서버에 부담이 될 수 있다.
  store:new FileStore() 
}))
  
app.get('/', function (req, res, next) {
    console.log(req.session);
    if(req.session.num === undefined){ // 세션 없을 때 
        req.session.num = 1; // 1설정
    } else { // 0 아니면
        req.session.num =  req.session.num + 1; // 1씩 더함
    }
    res.send(`Views : ${req.session.num}`); //세션 보여줌
})
 
app.listen(3000, function () {
    console.log('3000!');
});
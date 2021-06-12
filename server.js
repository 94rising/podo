//모듈
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const fs = require('fs');


const PORT = 3000;

//bodyPaser : 라우팅보다 위에 있어야함
app.use(express.json()); // json으로 받아들인 정보를 분석함
app.use(express.urlencoded( {extended : false } )); 
// 이 옵션이 false면 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석하고, 
// true면 qs 모듈을 사용하여 쿼리스트링을 해석한다
app.use( session ({
    secret: 'humanwater',
    resave: false,
    saveUninitialized: true,
    secure: false,
    cookie: { secure: false, maxAge: 60000 }
}))
app.use('/static', express.static('public'));


//앱 세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//라우팅
const mainRouter = require('./routes/mainController.js');
const loginRouter = require('./routes/loginController.js');
const joinRouter = require('./routes/joinController.js');
const diaryRouter = require('./routes/diaryController.js');
const categoryRouter = require('./routes/categoryController.js');
const dbConnection = require('./util/database');

app.get('/navbar', (req, res) => {
    const navbarHtml = fs.readFileSync( __dirname + '\\views\\navbar.html');
    res.send(navbarHtml.toString());
});



app.use('/', mainRouter); //use -> 미들 웨어를 등록해주는 메서드.
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/diary', diaryRouter);
app.use('/category', categoryRouter);


//서버 가동
const server = app.listen(PORT, () => {
    console.log('Start Server : localhost:3000');
});

//db 
dbConnection.connect( function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
});





//모듈
require('dotenv').config();

// console.log(process.env.KAKAO_KEY);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const EMOTION_CODE =  require('./util/emotion_code');
const cors = require('cors');

console.log()

const PORT = 3000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
//bodyPaser : 라우팅보다 위에 있어야함
app.use(cors(corsOptions));
app.use(express.json()); // json으로 받아들인 정보를 분석함
app.use(express.urlencoded( {extended : false } )); 
// 이 옵션이 false면 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석하고, 
// true면 qs 모듈을 사용하여 쿼리스트링을 해석한다
app.use( session ({
    secret: 'pododo',
    resave: false,
    saveUninitialized: true,
    secure: false,
    cookie: { secure: false, maxAge: 60000 }
}))


app.use('/static', express.static('public'));
app.use('/views', express.static('views'));


//앱 세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//라우팅
const mainRouter = require('./routes/mainController.js');
const loginRouter = require('./routes/loginController.js');
const findRouter = require('./routes/findController.js');
const joinRouter = require('./routes/joinController.js');
const diaryRouter = require('./routes/diaryController.js');
const diaryListRouter = require('./routes/diaryListController.js');
const compreRouter = require('./routes/compreController.js');
const menuRouter = require('./routes/menuController.js');


const dbConnection = require('./util/database');

app.get('/navbar', (req, res) => {
    const navbarHtml = fs.readFileSync( __dirname + '\\views\\navbar.html');
    res.send(navbarHtml.toString());
});



app.use('/', mainRouter); //use -> 미들 웨어를 등록해주는 메서드.
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/diary', diaryRouter);
app.use('/category', diaryListRouter);
app.use('/find', findRouter);
app.use('/compre', compreRouter);
app.use('/menu', menuRouter);





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





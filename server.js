//모듈
const express = require('express');
const app = express();
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const PORT = 3000;

//라우팅
const mainRouter = require('./routes/mainController.js');
const loginRouter = require('./routes/loginController.js');
const joinRouter = require('./routes/joinController.js');
const calendarRouter = require('./routes/calendarController.js');
const diaryRouter = require('./routes/diaryController.js');
const categoryRouter = require('./routes/categoryController.js');
const dbConnection = require('./util/database');

app.use('/', mainRouter); //use -> 미들 웨어를 등록해주는 메서드.
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/diary', diaryRouter);
app.use('/calendar', calendarRouter);
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

//앱 세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/static', express.static('public'));
app.use(session({ //사용자가 요청할때 session 함수 실행
    secret: 'pododo', //   
    resave: false, 
    saveUninitialized: true, // 세션이 필요할떄만 사용 , false 하면 항상 구동되어 서버에 부담이 될 수 있다.
    store:new FileStore() 
}));



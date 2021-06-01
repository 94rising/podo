//모듈
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const PORT = 3000;

//bodyPaser : 라우팅보다 위에 있어야함
app.use(express.json()); // json으로 받아들인 정보를 분석함
app.use(express.urlencoded( {extended : false } )); 
// 이 옵션이 false면 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석하고, 
// true면 qs 모듈을 사용하여 쿼리스트링을 해석한다


//라우팅
const mainRouter = require('./routes/main.js');
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
    secret: 'pododo', // secret: 세션을 설정할 때의 key값, 혹시 모를 세션 해킹을 대비하기 위해 주기적으로 값 변경
    resave: false, // resave: 세션을 저장하고 불러오는 과정에서 세션을 다시 저장할건지 선택가능
    saveUninitialized: true, // saveUninitialized: 세션을 저장할 때 초기화를 할 것인지 / 세션이 필요할떄만 사용 , false 하면 항상 구동되어 서버에 부담이 될 수 있다.
    store:new FileStore()   // store: 세션 보안 관련
}));



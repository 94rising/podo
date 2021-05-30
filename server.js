const express = require('express');
const app = express();
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const mainRouter = require('./routes/main.js');
const loginRouter = require('./routes/login.js');
const joinRouter = require('./routes/join.js');
const calendarRouter = require('./routes/calendar.js');
const diaryRouter = require('./routes/diary.js');
const categoryRouter = require('./routes/category.js');
const dbConnection = require('./util/database');


const server = app.listen(3000, () => {
    console.log('Start Server : localhost:3000');
});

dbConnection.connect( function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({ //사용자가 요청할때 session 함수 실행
    secret: 'pododo', //   
    resave: false, 
    saveUninitialized: true, // 세션이 필요할떄만 사용 , false 하면 항상 구동되어 서버에 부담이 될 수 있다.
    store:new FileStore() 
}));

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/diary', diaryRouter);
app.use('/calendar', calendarRouter);
app.use('/category', categoryRouter);

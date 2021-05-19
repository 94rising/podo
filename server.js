const express = require('express');
const app = express();



const server = app.listen(3000, () => {
    console.log('Start Server : localhost:3000');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/join', (req, res) => res.sendFile(__dirname + '/views/join.html' ));
app.get('/main', (req, res) => res.sendFile(__dirname + '/views/main.html' ));
app.get('/folderBtn', (req, res) => res.sendFile(__dirname + '/views/folder.html' ));
app.get('/calendarBtn', (req, res) => res.sendFile(__dirname + '/views/calendar.html' ));


app.get('/', function (req, res) {
    res.render('login.html')
  })

app.post('/login', (req, res) => {
  const ID = req.body.ID;
  const password = req.body.password;
  /*dbConnection.query("SELECT * FROM member WHERE phone_number = ? and password = ?",[phoneNumber, password], function (err, result) { //id가 DB에있는지 확인 
    if (err) throw err; 
    if (result[0] !== undefined) {
      res.send({result:true})
    } else {
      res.send({result:false})
    }*/
  });



// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'example.org',
//   user     : 'bob',
//   password : 'secret'
// });
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });
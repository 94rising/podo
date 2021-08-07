const mysql = require('mysql2');
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    port: 3306,
    database: process.env.DB_NAME,
});

module.exports = dbConnection;
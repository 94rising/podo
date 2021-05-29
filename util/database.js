const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<password>',
    port: 3306,
    database: 'podo',
});

module.exports = dbConnection;
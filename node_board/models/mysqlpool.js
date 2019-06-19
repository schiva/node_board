const mysql = require('mysql2/promise');

//==== mysql 데이타베이스연결 설정 //
const pool =  mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1111',
    database: 'test',
    queueLimit: 0,
    waitForConnections: true,
    debug: false
});


module.exports = pool;
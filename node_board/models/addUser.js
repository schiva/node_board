var pool = require('./mysqlpool');

var addUser = async (id, name, age, password) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            var data = { id: id, name: name, age: age, password: password };
            const [rows] = await connection.query('insert into users set ?', data);
            connection.release();
            console.log('사용자 추가완료');            
            return rows;
        } catch (err) {
            connection.release();
            console.error('사용자 추가 오류 ');
            console.dir(err);
            return false;
        }

    } catch (err) {
        console.error('데이타베이스 처리 오류 ');
        console.dir(err);
        return false;
    }
}
//var addUser = async function (id, name, age, password, callback) {
//    pool.getConnection(function (err, conn) {
//        if (err) {
//            if (conn) {
//                conn.release();
//            }

//            callback(err, null);
//            return;
//        }

//        console.log('데이타 베이스 연결 쓰레드 아이디 : ' + conn.threadId);

//        var data = { id: id, name: name, age: age, password: password };
//        console.log('사용자 추가 : ', data);
//        console.log(id);
//        console.log(name);
//        console.log(age);
//        console.log(password);

//        var exec = conn.query('insert into users set ?', data, function (err, result) {
//            conn.release();
//            console.log('실행 대상 SQL : ' + exec.sql);

//            if (err) {
//                console.log('SQL 실행 오류');
//                console.dir(err);

//                callback(err, null);
//                return;
//            }
//            callback(null, result);
//        })
//    })
//}

module.exports = addUser;
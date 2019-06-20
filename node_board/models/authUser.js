var pool = require('./mysqlpool');

var authUser = async (id, password) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            var columns = ['id', 'name', 'age'];
            var tablename = 'users';

            const [rows] = await connection.query("select ?? from ?? where id = ? and password = ?",
                [columns, tablename, id, password]);

            connection.release();

            if (rows) {
                if (rows.length >= 1) {
                    return (rows);
                } else {
                    connection.release();
                    console.log('사용자 인증 자료없음');
                    return false;
                }                                
                
            } else {
                connection.release();
                return false;
            }
        } catch (err) {
            connection.release();
            console.error('사용자 인증 오류 ');
            console.dir(err);
            return false;
        }

    } catch (err) {
        console.error('데이타베이스 처리 오류 ');
        console.dir(err);
        return false;
    }
}

module.exports = authUser;
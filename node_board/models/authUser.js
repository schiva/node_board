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
                    throw { Error: '사용자 자료 없음' };                    
                }                                                
            } else {
                connection.release();
                throw { Error: '사용자 자료 조회 오류' };
            }
        } catch (err) {
            connection.release();
            throw { Error: err.message };
        }
    } catch (err) {
        throw { Error: err.message };
    }
}

module.exports = authUser;
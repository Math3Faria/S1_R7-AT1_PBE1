const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'loja_db',
    port: '3306',
    waitForConnections: true, //Aguardar conexões livres
    connectionLimit: 10, // limitir o número de conexões simultaneas
    queueLimit: 0 // 0 = Sem limite para fila
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao MySQL')
        connection.release();
    } catch (error) {
        console.log(`Erro ao conectar com o MySQL: ${error}`)
    }
})();


module.exports = { pool };
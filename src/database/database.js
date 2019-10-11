const mysql = require('mysql');

const mysqlConection = mysql.createConnection({

    
    database: 'bd_hitmeupp',
    host: '127.0.0.1',
    user: 'root',
    password: '',

});

mysqlConection.connect(function (err) {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('Conexion Exitosa');
    } 
});

module.exports = mysqlConection; 
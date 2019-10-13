const mysql = require('mysql');

const mysqlConection = mysql.createConnection({

    
     database: 'bd_hitmeupp',
     host: '165.22.172.115',
     user: 'itd3',
     password: 'Z8Iqtq*auj)7',

    // database: 'bd_hitmeupp',
    // host: '120.0.0.1',
    // user: 'root',
    // password: '',

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
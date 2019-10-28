//-----------Imports------------------
//express
const express = require('express');
//metodo path se encarga de unir directorios
const path = require('path');
//para registrar las peticiones que llegan
const morgan = require('morgan');
//importar parser de JSON
const bodyParser = require('body-parser');

const app = express();
//importar para el manejo de los sockets
const server = require('http').createServer(app);

//Conexión del socket
const io = require('socket.io')(server);


require('./database/database');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

//api basado en express
app.set('port', process.env.PORT || 3749);

//-----------Static Files------------------    
//para archivos imagenes framework archivos css, js, etc
app.use(express.static(path.join(__dirname, 'public')));
//-----------Middlewares------------------
app.use(morgan('dev'));
//parseando JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//para entender todos los datos que vengan del formulario y como configuracion extended false por que no enviara imagenes


//-----------Settings------------------
//configuracion de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});
//importando routes
const publicaciones = require('./routes/publicaciones.route');
const contactos = require('./routes/contactos.route');
const usuarios = require('./routes/usuario.route');
const like = require('./routes/like.route')
const comentarios = require('./routes/comentarios.route');

//-----------Routes------------------
app.use('/api/publicaciones/', publicaciones);
app.use('/api/contactos', contactos);
app.use('/api/usuarios', usuarios);
app.use('/api/likes',like);
app.use('/api/comentarios', comentarios);


// SOCKETS
io.on('connection', (socket) => {
    //AGREGAR: SOLO FUNCIONA POR UN ID
    socket.on('agregar_contacto', data => io.emit('contacto_agreado', { menssage: data }));
    //ELIMINAR CONTACTO
    socket.on('eliminar_contacto', data => io.emit('contacto_eliminado', { menssage: data }));
    //INGRESAR
    socket.on('ingresar_contacto', data => io.emit('contacto_ingresado', { menssage: data }));
    //VIDEO_LLAMADA -> el puente tenga el id_contacto **
    //INICIAR LLAMADA
    socket.on('iniciar_llamada', data => io.emit('respuesta_llamada' + data.id, { menssage: data }));
    //RESPONDER LLAMADA
    socket.on('denegar_llamada', data => io.emit('llamada_denegada' + data.id, { menssage: data }));
});

server.on('listening', function () {
    console.log('Servidor en el puerto', app.get('port'));
});

server.listen(app.get('port'));

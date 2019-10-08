const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'iTeamDevs';

exports.crearToken = function(usuario){
    const payload = {
        id_admin: usuario.id_admin,
        id_tipo_admin: usuario.id_tipo_admin,
        nombre: usuario.nombre,
        ape_paterno:usuario.apepat,
        ape_materno:usuario.apemat,
        correo: usuario.correo,
        dni: usuario.dni,
        iat: moment().unix(),
        exp: moment().add(30, 'dias').unix
    };
    return jwt.encode(payload, secret);
};



exports.decodificarToken = function(req,res){
    const token = req.split(" ")[1];
    const payload = jwt.decode(token, secret);
    return payload;
};

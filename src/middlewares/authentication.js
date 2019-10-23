const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'iTeamDevs';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization) {
        return res.send({
            status : 'error',
            message: 'Token no encontrado',
            code: '400'
        });
    }
    const payload = jwt.decode(token, secret);
    try {    
        if(payload.exp <= moment().unix()){
            return res.send({
                status : 'error',
                message: 'Token ha expirado',
                code: '400'
            });
        }
    } catch (ex) {
        console.log(token);
        return res.send({
            status : 'error',
            message: 'Token no válido',
            code: '400'
        });
    }
    req.user = payload;
    next();
};


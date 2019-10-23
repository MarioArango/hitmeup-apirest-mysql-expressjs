const usuario_controller = {};
const mysql = require('../database/database');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('../middlewares/jwt');
const mail = require('../utils/mail.utils');

usuario_controller.listar_comunidad_usuario = function(req, res){
 
    const id_usuario = (jwt.decodificarToken(req.headers.authorization)).id_usuario;
    console.log(id_usuario);
    const sql = "call SP_GET_ListarComunidad(?)";
    mysql.query(sql, id_usuario,(err, comunidad)=>{
        if(!err){
            res.status(200).send({status:'Success', comunidad: comunidad[0], code:200}); 
        }else{
            res.status(400).send({ status: 'Error', message: 'Error.', error: err, code: 400});
        }
    });
};

usuario_controller.login = function(req,res){
    const params = req.body;
    const nick = params.nick_usuario;
    const password = params.password_usuario;
     console.log(nick,password);     
     const sql = "call SP_GET_ValidarUsuarioLogin(?)";
      mysql.query(sql,nick,(err, usuario)=>{
          if(!err){
              if(usuario[0][0]!= undefined){
                bcrypt.compare(password, usuario[0][0].password, function(err_bcrypt,res_bcrypt){
                    if (res_bcrypt) {
                      if(usuario[0][0].estado_usuario=="1"){
                        res.status(200).send({status:'Success', usuario: usuario[0][0], token:jwt.crearToken(usuario[0][0]),code:200}); 
                      }else{
                        res.status(403).send({ status: 'Error', message: 'Usuario no habilitado', code:403 });
                      }
                    }else{
                      res.status(404).send({ status: 'Error', message: 'Contraseña Incorrecta', code:404 });
                    }
                 });
              }else{
                  res.status(404).send({status:'Error', message: 'Usuario Incorrecto.', code:404});
              }
        }else{
            res.status(400).send({ status: 'Error', error: err, code: 400});
        }
    });
};

usuario_controller.cambiar_conexion_usuario = function(req, res){
   const params = req.body;
   const id_usuario =  params.id_usuario;
   const estado_usuario = params.estado_usuario;
   console.log("data:",req.body);
    const sql = "call SP_PUT_CambiarConexionUsuario(?,?)";
    mysql.query(sql, [id_usuario, estado_usuario],(err, respuesta)=>{
      if(!err){
        res.status(200).send({status:'Success', message: 'Cambio exitoso.', code:200});
      }else{
        res.status(400).send({ status: 'Error', error: err, code: 400});
      }
    });
 }




usuario_controller.recuperar_password = (req, res) => {

  const { email } = req.body;
  console.log(email);
  const sql = 'call SP_RecuperarContrasenia(?)'
  mysql.query(sql, [email], (err, password) => {
      if (!err) {
        const pass = password[0][0];
        mail.recuperar_password('Se recibio tu solicitud de recuperación de contraseña.', email, pass.password);
        res.status(200).send({ status:'Success', message: 'Se modifico correctamente', code:'200'});
      } else {
          res.status(400).send({ status: 'Error', error: err, code: 400 });
      }
  })
}

module.exports = usuario_controller;
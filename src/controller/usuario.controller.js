const usuario_controller = {};
const mysql = require('../database/database');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

usuario_controller.listar_comunidad_usuario = function(req, res){
 
    var id_usuario = req.params.id_usuario;
    console.log(id_usuario);
    const sql = "call SP_GET_ListarComunidad(?)";
    mysql.query(sql, id_usuario,(err, comunidad)=>{
        if(!err){
            res.status(200).send({status:'Success', comunidad: comunidad[0], code:200}); 
        }else{
            res.status(400).send({ status: 'Error', message: 'Error.', error: err, code: 400});
        }
    });
}
  usuario_controller.login = function(req,res){
    const params = req.body;
    const nick = params.nick_usuario;
     const password = params.password_usuario;
     console.log(nick,password);     
     const sql = "call SP_GET_ValidarUsuarioLogin(?)";
      mysql.query(sql,nick,(err, usuario)=>{
          if(!err){
              if(usuario[0][0]!= undefined){
                //   bcrypt.compare(password, usuario[0][0].password, function(err_bcrypt,res_bcrypt){
                      if(usuario[0][0].password === password){
                          if(usuario[0][0].estado_usuario=="1"){
                            res.status(200).send({status:'Success', usuario: usuario[0][0], code:200}); 
                          }else{
                            res.status(403).send({ status: 'Error', message: 'Usuario no habilitado', code:403 });
                          }
                      }else{
                        res.status(404).send({ status: 'Error', message: 'Contraseña Incorrecta', code:404 });
                      }
                //   });
              }else{
                  res.status(404).send({status:'Error', message: 'Usuario Incorrecto.', code:404});
              }
        }else{
            res.status(400).send({ status: 'Error', error: err, code: 400});
        }
    });
 }
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
 usuario_controller.recuperar_password = function(req, res){
   const params = req.body;
   const email = params.email;
   const nick = params.nick;
   console.log(req.body);
  const sql = "call SP_RecuperarContraseña(?)";
  mysql.query(sql, nick,(err, contraseña)=>{
    if(!err){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hitmeup.soport@gmail.com',
          pass: 'hitmeup.soport123'
        }
      });
      var mensaje = "Hola, hemos recibido tu solicitud y tu contraseña es: "+ contraseña[0][0];
      
      var mailOptions = {
        from: 'hitmeup.soport@gmail.com',
        to: email,
        subject: 'SOPORTE HITMEUP - RECUPERACIÓN DE CONTRASEÑA',
        text: mensaje
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
    }else{
      res.status(400).send({ status: 'Error', error: err, code: 400});
    }
  });
 
}


module.exports = usuario_controller;
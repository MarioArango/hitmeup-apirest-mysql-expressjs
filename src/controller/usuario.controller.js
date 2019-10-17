const usuario_controller = {};
const mysql = require('../database/database');
const bcrypt = require('bcrypt');

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
     const sql = "call SP_GET_ValidarUsuarioLogin(?);"
      mysql.query(sql,[nick,password],(err, usuario)=>{
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




module.exports = usuario_controller;
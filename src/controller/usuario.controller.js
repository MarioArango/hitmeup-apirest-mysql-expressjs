const usuario_controller = {};
const mysql = require('../database/database');

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
     const sql = "SP_GET_ValidarUsuarioLogin(?,?);"
      mysql.query(sql,[nick,password],(err, datosUsuario)=>{
          if(!err){
             res.status(200).send({status:'Success', datos_usuario: datosUsuario[0], code:200}); 
        }else{
            res.status(400).send({ status: 'Error', message: 'El usuario no existe.', error: err, code: 400});
        }
    });
 }




module.exports = usuario_controller;
const publicaciones_controller = {};
const mysql = require('../database/database');

publicaciones_controller.listar_todas_publicaciones = function (req, res){
     
    const sql = "call SP_GET_ListarPublicaciones()";
    const sql2 ="call SP_GET_ListarComentarios()"
   
    mysql.query(sql, (err, publicaciones)=>{
        if(!err){
            mysql.query(sql2,  (err2, comentarios)=>{
                if(!err2){
                        res.status(200).send({status:'Success', publicaciones: publicaciones[0],comentarios:comentarios[0], code:200}); 
                }else{
                    res.status(400).send({ status: 'Error', error: err, code: 400});
                }
            });
        }else{
            res.status(400).send({ status: 'Error', error: err, code: 400});
        }
    });
}
publicaciones_controller.listar_publicaciones_de_usuario = function(req, res){
 
    var id_usuario = req.params.id_usuario;
    console.log(id_usuario);
    const sql = "call SP_GET_ListarPublicacionesUsuario(?)";
    mysql.query(sql, id_usuario,(err, publicaciones)=>{
        if(!err){
            res.status(200).send({status:'Success', publicaciones: publicaciones[0], code:200}); 
        }else{
            res.status(400).send({ status: 'Error', message: 'El usuario no tiene publicaciones', error: err, code: 400});
        }
    });
}
module.exports = publicaciones_controller;
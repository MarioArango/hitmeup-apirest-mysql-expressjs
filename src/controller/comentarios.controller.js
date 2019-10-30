const comentarios_controller = {};
const mysql = require('../database/database');

comentarios_controller.agregar_comentario = function(req, res){
    const params = req.body;
    const id_publicacion = params.id_publicacion;
    const id_usuario = params.id_usuario;
    const contenido_comentario = params.contenido_comentario;
    const sql = "call SP_POST_AgregarComentario(?,?,?)";

    mysql.query(sql, [id_usuario,id_publicacion, contenido_comentario],(err, respuesta)=>{
        if(!err){
            res.status(200).send({status:"Success", message: "Se agrego correctamente.", code:200})
        }else{
            res.status(400).send({status: "Error", Error: err, code: 400})
        }
    });
}
comentarios_controller.editar_comentario = function(req, res){
    const params = req.body;
    const id_comentario = params.id_comentario;
    const contenido_comentario = params.contenido_comentario;
    const sql = "call SP_PUT_EditarComentario(?,?)";

    mysql.query(sql, [id_comentario, contenido_comentario],(err, respuesta)=>{
        if(!err){
            res.status(200).send({status:"Success", message: "Se modifico correctamente.", code:200})
        }else{
            res.status(400).send({status:"Error",Error: err, code:400})
        }
    });
}
comentarios_controller.cambiar_estado_comentario = function(req, res){
    const params = req.body;
    const id_comentario = params.id_comentario;
    const estado_comentario = params.estado_comentario;
    const sql = "call SP_PUT_CambiarEstadoComentario(?,?)";

    mysql.query(sql, [id_comentario, estado_comentario], (err, respuesta)=>{
        if(!err){
            res.status(200).send({status:"Success", message: "Se elimino correctamente.", code:200})
        }else{
            res.status(400).send({status:"Error",Error: err, code:400})
        }
    });
}
module.exports = comentarios_controller;
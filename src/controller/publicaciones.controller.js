const publicaciones_controller = {};
const mysql = require('../database/database');

publicaciones_controller.listar_todas_publicaciones = function (req, res){
    const sql = "call SP_GET_ListarPublicaciones()";
    mysql.query(sql, (err, publicaciones)=>{
        if(!err){
            //console.log(publicaciones[0])
            modelo=publicaciones[0]
            for(let i=0; i< publicaciones[0].length;i++){
                    modelo[i].comentarios = JSON.parse(modelo[i].comentarios)
            }
            res.status(200).send({status:'Success', publicaciones: modelo,code:200}); 
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
            modelo=publicaciones[0]
            for(let i=0; i< publicaciones[0].length;i++){
                    modelo[i].comentarios = JSON.parse(modelo[i].comentarios)
            }
            res.status(200).send({status:'Success', publicaciones: modelo, code:200}); 
        }else{
            res.status(400).send({ status: 'Error', message: 'El usuario no tiene publicaciones', error: err, code: 400});
        }
    });
}
publicaciones_controller.agregar_publicacion = function(req,res){

    const params = req.body;
    const id_usuario = params.id_usuario;
    const titulo_publicacion = params.titulo_publicacion;
    const contenido_publicacion = params.contenido_publicacion;

    const sql= "call SP_POST_AgregarPublicacion(?,?,?)";
    mysql.query(sql, [id_usuario, titulo_publicacion, contenido_publicacion],(err,respuesta)=>{
        if(!err){
            res.status(200).send({status:'Success', message: 'Se agrego la publicación correctamente.',code:200})
        }else{
            res.status(400).send({status: 'Error', message:'No se pudo agregar la publicación.', code:400})
        }
    });
}
publicaciones_controller.editar_publicacion =  function(req,res){
    const params = req.body;
    const id_publicacion = params.id_publicacion;
    const titulo_publicacion = params.titulo_publicacion;
    const contenido_publicacion = params.contenido_publicacion;

    const sql = "call SP_PUT_EditarPublicacion(?,?,?)";
    mysql.query(sql, [id_publicacion, titulo_publicacion,contenido_publicacion], (err, respuesta)=>{
        if(!err){
            res.status(200).send({status: "success", message: "Se modifico la publicación correctamente.", code:200});
        }else{
            res.status(400).send({status: "error", error: error, code:400});
        }
    });
}
publicaciones_controller.cambiar_estado_publicacion = function(req, res){
    const params = req.body;
    const id_publicacion = params.id_publicacion;
    const estado_publicacion = params.estado_publicacion;
    const sql = "call SP_PUT_CambiarEstadoPublicacion(?,?)";

    mysql.query(sql, [id_publicacion, estado_publicacion], (err, respuesta)=>{
        if(!err){
            res.status(200).send({status:"Success", message: "Se elimino correctamente.", code:200})
        }else{
            res.status(400).send({status:"Error",Error: err, code:400})
        }
    });
}
module.exports = publicaciones_controller;
const publicaciones_controller = {};
const mysql = require('../database/database');

publicaciones_controller.listar_todas_publicaciones = function (req, res){
    const sql = "call SP_GET_ListaUsuariosxPublicaciones()";
   
    mysql.query(sql, (err, publicaciones)=>{
        if(!err){
            res.status(200).send({status:'Success', publicaciones: publicaciones[0], code:200});
        }else{
            res.status(400).send({ status: 'Error', error: err, code: 400});
        }
    });
}
module.exports = publicaciones_controller;
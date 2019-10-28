const like_controller = {};
const mysql = require("../database/database");

like_controller.cambiar_estado_like = function(req, res){
    const params = req.body;
    const id_usuario = params.id_usuario;
    const id_publicacion = params.id_publicacion;
    const sql = ("call SP_Generar_Like_Estado(?,?)");
    mysql.query(sql, [id_usuario, id_publicacion],(error, respuesta)=>{
        if(!error){
            res.status(200).send({status: "Success", message: "Se gestiono like", code:200});
        }else{
            res.status(400).send({status: "Error", error: error, code: 400});
        }
    });
}

module.exports = like_controller;
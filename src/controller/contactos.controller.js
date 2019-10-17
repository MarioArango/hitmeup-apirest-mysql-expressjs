const contactos_controller = {};
const mysql = require('../database/database');

contactos_controller.listar_contactos = function(req,res){
    var idUsuario = req.params.id_usuario;
    const sql = ("call SP_GET_ListarContactos(?)");

    mysql.query(sql, idUsuario,(err, contactos)=>{
        if(!err){
            if(contactos[0]!= ''){
                res.status(200).send({status: "Success", contactos: contactos[0], code:200});
            }else{
                res.status(400).send({status: "error", message: "El usuario no esta registrado o no tiene contactos.", code:400});
            }
            
        }else{
            res.status(400).send({status: "error", err, code:400});
        }
    });
        
   
}
contactos_controller.añadir_contacto_estado =function(req,res){
   const params = req.body; 
    const idUsuario = params.id_usuario;
    const idContacto = params.id_contacto;
    console.log("Data Body:",params);
    const sql = ("call SP_Agregar_Contacto_Estado(?,?)");

    mysql.query(sql,[idUsuario, idContacto],(err, respuesta)=>{
        if(!err){
                res.status(200).send({status:'Success',message: 'El usuario se gestiono correctamente.', code:200});
        }else{
            res.status(400).send({status:'Error',Error: err,code:400});
        }
    });
}

contactos_controller.listar_datos_contacto = function(req, res){
    var id_contacto = req.params.id_contacto
    const sql = ("call SP_GET_ListarDatosContacto(?)")
    mysql.query(sql,id_contacto,(err, datosContacto)=>{
        if(!err){
                res.status(200).send({status:'Success',datos_contacto: datosContacto[0], code:200});
        }else{
            res.status(400).send({status:'Error',Error: err,code:400});
        }
    });

}

module.exports = contactos_controller;
const mysql = require('../database/database')
const administrador_controller = {}

administrador_controller.deshabilitar_usuario = (req, res) => {
    const sql = ' call SP_POST_DeshabilitarUsuario(?)'
    const{_id} = req.body
    mysql.query(sql, [_id], (error, dato) => {
        if (!error) {
            res.status(200).send({ status: "Success", message: "Usuario deshabilidato.", code: 200 })
        } else {
            res.status(400).send({ status: "Error", Error: error, code: 400 })
        }
    })
}

administrador_controller.agregar_usuario = (req, res) => {
    const sql = 'call SP_POST_AgregarUsuario(?,?,?,?,?,?,?,?)'
    const { _id_nivel, _nombre_usuario, _apePaterno_usuario, _apeMaterno_usuario,
        _dni_usuario, _email_usuario, _nick, _password} = req.body
    mysql.query(sql, [_id_nivel, _nombre_usuario, _apePaterno_usuario, _apeMaterno_usuario,
        _dni_usuario, _email_usuario, _nick, _password], (error, dato) => {
            if (!error) {
                res.status(200).send({ status: "Success", message: "Usuario creado.", code: 200 })
            } else {
                res.status(400).send({ status: "Error", Error: error, code: 400 })
            }
        })
    
}

administrador_controller.actualizar_usuario = (req, res) => {
    const sql = 'call SP_PUT_ActualizarUsuario(?,?)'
    const {_id_datosUsuario} = req.params
    const {_dni_usuario} = req.body

    mysql.query(sql, [_id_datosUsuario, _dni_usuario], (error, dato) => {
        if (!error) {
            res.status(200).send({ status: "Success", message: "DNI actualizado.", code: 200 })
        } else {
            res.status(400).send({ status: "Error", Error: error, code: 400 })
        }
    })
}

module.exports = administrador_controller;
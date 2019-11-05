const mysql = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('../middlewares/jwt');
const mail = require('../utils/mail.utils');
const generatePassword = require('../utils/password.utils')
const path = require('path')
const {randomNumer} = require('../utils/libs')
const fs = require('fs-extra')
const usuario_controller = {};

usuario_controller.listar_comunidad_usuario = function (req, res) {

  // const id_usuario = (jwt.decodificarToken(req.headers.authorization)).id_usuario;
  const id_usuario = req.params.id_usuario;
  console.log(id_usuario);
  const sql = "call SP_GET_ListarComunidad(?)";
  mysql.query(sql, id_usuario, (err, comunidad) => {
    if (!err) {
      res.status(200).send({ status: 'Success', comunidad: comunidad[0], code: 200 });
    } else {
      res.status(400).send({ status: 'Error', message: 'Error.', error: err, code: 400 });
    }
  });
};

usuario_controller.login = function (req, res) {
  const params = req.body;
  const nick = params.nick_usuario;
  const password = params.password_usuario;
  console.log(nick, password);
  const sql = "call SP_GET_ValidarUsuarioLogin(?)";
  mysql.query(sql, nick, (err, usuario) => {
    if (!err) {
      if (usuario[0][0] != undefined) {
        bcrypt.compare(password, usuario[0][0].password, function (err_bcrypt, res_bcrypt) {
          if (res_bcrypt) {
            if (usuario[0][0].estado_usuario == "1") {
              res.status(200).send({ status: 'Success', usuario: usuario[0][0], token: jwt.crearToken(usuario[0][0]), code: 200 });
            } else {
              res.status(403).send({ status: 'Error', message: 'Usuario no habilitado', code: 403 });
            }
          } else {
            res.status(404).send({ status: 'Error', message: 'Contraseña Incorrecta', code: 404 });
          }
        });
      } else {
        res.status(404).send({ status: 'Error', message: 'Usuario Incorrecto.', code: 404 });
      }
    } else {
      res.status(400).send({ status: 'Error', error: err, code: 400 });
    }
  });
};

usuario_controller.cambiar_conexion_usuario = function (req, res) {
  const params = req.body;
  const id_usuario = params.id_usuario;
  const estado_conexion = params.estado_conexion;
  console.log("data:", req.body);
  const sql = "call SP_PUT_CambiarConexionUsuario(?,?)";
  mysql.query(sql, [id_usuario, estado_conexion], (err, respuesta) => {
    if (!err) {
      res.status(200).send({ status: 'Success', message: 'Cambio exitoso.', code: 200 });
    } else {
      res.status(400).send({ status: 'Error', error: err, code: 400 });
    }
  });
}




usuario_controller.recuperar_password = (req, res) => {
  const { email } = req.body;
  console.log(email);
  const sql = 'call SP_RecuperarContrasenia(?,?)'
  var password = generatePassword.random();
  console.log(password)
  bcrypt.hash(password, generatePassword.numero_saltos(), function (err, hash) {
    mysql.query(sql, [email, hash], (err, flag) => {
      if (!err) {
        if (flag[0][0].flag === 0) {
          res.status(400).send({ status: 'Error', message: 'No existe el email ingresado.', code: 400 });
        } else {
          if (flag[0][0].flag === 1) {
            res.status(400).send({ status: 'Error', message: 'El usuario ya no esta habilitado.', code: 300 });
          } else {
            console.log(flag[0][0].flag);
            mail.recuperar_password('Se recibio tu solicitud de recuperación de contraseña.', email, password);
            res.status(200).send({ status: 'Success', message: 'Se modifico correctamente', code: '200' });
          }
        }
      } else {
        res.status(400).send({ status: 'Error', error: err, code: 400 });
      }
    })

  })
}

usuario_controller.modificar_perfil  = function (req, res) {
  const params = req.body;
  const paramsFile = req.files;
  const id_usuario = params.id_usuario;
  const id_nivel = params.id_nivel;
  const dni = params.dni;
  const email = params.email;
  
console.log(req.body, req.files);
  const sql = "call SP_PUT_ModificarPerfilUsuario(?,?,?,?)";
  

  mysql.query(sql, [id_usuario, id_nivel, dni, email], (err, respuesta) => {
      if (!err) {
        if (req.files) {
          const foto_usuario = paramsFile.foto_usuario;
          console.log("foto: ", foto_usuario)
          var nombre_foto_usuario= (foto_usuario.path).split('/')[4];
          var extension_foto_usuario = (foto_usuario.type).split('/')[1];
          const sql2 = "call SP_PUT_ModificarPerfilUsuarioImagen(?,?,?,?,?)";
          if (extension_foto_usuario == 'jpg' || extension_foto_usuario == 'png' || extension_foto_usuario == 'jpeg') {
            mysql.query(sql2, [id_usuario, id_nivel, dni, email, nombre_foto_usuario], (err_2, respuesta2) => {
              if (!err_2) {
                res.status(200).send({ status: 'Success', message: 'Se modifico correctamente usuario/imagen.', code: '200' });
              } else {
                res.status(400).send({ status: 'Error', error: err_2, code: '400' });
              }
            });
          } else {
            res.status(400).send({ status: 'Error', message: 'Tipo de imagen incorrecta.', code: 400 });
          }
        } else {
          res.status(200).send({ status: 'Success', message: 'Se modifico correctamente usuario. ', code: '200' });
        }
      } else {
        res.status(400).send({ status: 'Error', error: err, code: '400' });
      }
    });
}

usuario_controller.cambiar_password = (req, res) => {
  const params = req.body;
  const id_usuario = params.id_usuario;
  const pass = params.password;
  const sql = "call SP_PUT_CambiarPasword(?,?)";
  bcrypt.hash(pass, generatePassword.numero_saltos(), function (err, hash) {
    mysql.query(sql, [id_usuario, hash], (err, respuesta) => {
      if (!err) {
        res.status(200).send({ status: 'Success', message: 'Se modifico correctamente', code: '200' });
      } else {
        res.status(400).send({ status: 'Error', error: err, code: 400 });
      }
    });
  })
}

usuario_controller.actualizar_perfil = (req, res) => {
  const sql = 'call SP_PUT_ActualizarPerfil(?,?,?,?,?,?,?)'
  const { _id_datosUsuario } = req.params
  const { _nombre_usuario, _apePaterno_usuario, _apeMaterno_usuario, _email_usuario,_nick, _password} = req.body
  

    mysql.query(sql, [_id_datosUsuario, _nombre_usuario, _apePaterno_usuario, _apeMaterno_usuario, _email_usuario,_nick, _password], (error, dato) => {
      if (!error) {
        res.status(200).send({ status: 'Success', message: 'Perfil modificado', code: '200' });
      } else {
        res.status(400).send({ status: 'Error', error: error, code: 400 });
      }
  })
}

usuario_controller.cargar_imagen = (req, res) => {
    const saveImage = async () => {
      //extension de la imagen
      const ext = path.extname(req.file.originalname).toLowerCase()
      //direccion de la imagen
      const imagePath = req.file.path
      //Donde quiero colocar la imagen
      const imgURL = randomNumer() //caracteres random para el nomrbe de la img

        const targetPath = path.resolve(`src/public/images/${imgURL}${ext}`)
      
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
          //Mueve la ruta de la img de donde esta 'imagePath' a donde quiero que este 'targetPath'
          await fs.rename(imagePath, targetPath)
          const _foto_usuario= imgURL + ext
          const sql = 'call SP_PUT_AgregarImagen(?,?)'
          const {_id_datosUsuario} = req.params

          mysql.query(sql, [_id_datosUsuario, _foto_usuario], (error, dato) => {
            if (!error) {
              res.status(200).send({ status: 'Success', message: 'Foto agregada', code: '200' });
            } else {
              res.status(400).send({ status: 'Error', error: error, code: 400 });
            }
          })
      
        }else{
          //Eliminando datos de la imagen agregada en 'images' con extension incorrecta
          await fs.unlink(imagePath)
          res.status(500).json({error: 'Extensión invalida, pruebe otra.'})
        }
    }
    saveImage()
}

module.exports = usuario_controller;
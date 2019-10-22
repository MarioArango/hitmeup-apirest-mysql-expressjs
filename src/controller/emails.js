const nodemailer = require('nodemailer')
 
class Email{
    constructor(config){
        this.createTrasport = nodemailer.createTransport(config)
    }

    enviarCorreo(email){
        try{
            this.createTrasport.sendMail(email, (error, info)=>{
                if(error){
                    console.log("Error al enviar el correo")
                }else{
                    console.log('CORREO ENVIADO')
                }
                this.createTrasport.close()
            })
        }
            catch(x){
                console.log('ERROR DE ENVIO' + x)
                
            }
        }
    }

    module.exports = Email;
import { Module } from "module"

const helpers = {}

//RETORNO UNA PALABRA DE 6 CARACTERES, PARA ASGINAR COMO NOMBRE A LA IMAGEN
helpers.randomNumber = () => {
    const possible = 'abcdfghijklmopqrstuvwxyz1234567890'
    let randomNumber = 0
    for( let i = 0; i < 6; i++){
        randomNumber += possible.charAt(Math.floor(Math.random()*possible.length))
    }
    return randomNumber
}

module.exports = helpers;
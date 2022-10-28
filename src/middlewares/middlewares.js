const { check } = require("express-validator");

function middleapp(req, res, next) {
    check("campo")
        .notEmpty()// verifica que el campo no este vacio
        .isLength({ min: 5, max: 10 }) //verifica la langitud de los datos
        .isEmail() // Verifica que sea un email valido
        .isInt() // verifica que sea nuemero entero
    next()
}


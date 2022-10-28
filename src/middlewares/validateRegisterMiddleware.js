const { body } = require("express-validator");



// Paquete de validaciones
const validations = [
    body("firstname").notEmpty().withMessage("Debes ingresar tu nombre1"),
    body("lastname").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("email")
        .notEmpty().withMessage("Debes ingresar tu email").bail()
        .isEmail().withMessage("El formato debe ser valido para  un email"),
    body("password").notEmpty().withMessage("Debes ingresar tu contraseña"),
    body("avatar").custom((value, { req }) => {
        let file = req.file;
        /*  let acceptedExtensions = [".jpg",".png",".gif"];
         let fileExtensions = file.originalname */
        if (!file) {
            throw new Error("Tienes que subir una imagen")
        }
        /* if(!acceptedExtensions.includes(fileExtensions)){
        throw new Error("Las extensiones de archivo permitidos son ")
        } */
        return true
    })
]
module.exports= validations
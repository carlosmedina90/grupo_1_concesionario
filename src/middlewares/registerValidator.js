const { body, Result } = require("express-validator");


const registerValidator =[
    body("firstname").notEmpty().withMessage("Por favor complete campo Primer Nombre"),
    body("lastname").notEmpty().withMessage("Por favor complete campo Apellido"),
    body("email").notEmpty().withMessage("Por favor complete campo Email").isEmail().withMessage(" Email debe ser valido").bail(),
    body("password").notEmpty().withMessage("Por favor complete campo Contraseña"),
    
]

module.exports= registerValidator
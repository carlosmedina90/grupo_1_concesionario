

let express = require('express');
let router = express.Router();
let controllerUsers=require("../controller/controllerUsers")

// Middlewares
const cargarUsers = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



//creacion

router.get("/register", controllerUsers.register)
router.post("/register",cargarUsers.single("imagen"),validations, controllerUsers.guardado);
/* router.post("/register",registerValidator, controllerUsers.guardado); */

// login
router.get("/login",guestMiddleware, controllerUsers.login)

//procesar de registro
router.post("/login", cargarUsers.single("imagen"), validations, controllerUsers.processLogin)


//perfil de opciones
router.get("/opciones",authMiddleware, controllerUsers.opciones)

// Logout
router.get('/logout/', controllerUsers.logout);

//LECTURA
/* router.get("/", controllerAuto.index) */
router.get("/",authMiddleware, controllerUsers.listado)


//EDITAR USERS
router.get("/editar/:id/", controllerUsers.editar)
router.post("/editar/:id", cargarUsers.single("imagen"), controllerUsers.actualizar)

//BORRADO

router.post("/borrar/:id", controllerUsers.borrar)



//LECTURA
/* router.get("/opciones", controllerUsers.Bienvenida)
router.post("/opciones", controllerUsers.Bienvenida) */

module.exports = router;

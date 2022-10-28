let express = require('express');
let router = express.Router();
let controllerAuto = require("../controller/controllerAuto")
// Se ingresa multer para guardar archivos
let multer = require("multer")
// definir ruta de los alrchivos a guardar
let rutaAlmacen = multer.diskStorage(
    {
        destination: function (req, file, callback) {
            callback(null, "./public/img/");
        },
        filename: function (req, file, callback) {
            console.log(file);
            let fechaImagen = Date.now()
            callback(null, fechaImagen + "_" + file.originalname)
        }
    }
)
function fileFilter(req, file, callback) {
    const validFormat = ['image/jpeg', 'image/jpg']
    // La función debe llamar a `cb` usando una variable del tipo boolean
    // para indicar si el archivo debería ser aceptado o no
    if (validFormat.includes(file.mimetype)) {
        // Para aceptar el archivo es necesario pasar `true`, de la siguiente forma:
        callback(null, true)
    } else {
        // Para rechazar el archivo es necesario pasar `false`, de la siguiente forma:
        callback(null, false)
    }
}
// Para poder adicionar la anterior direccion
let cargar = multer({ storage: rutaAlmacen, fileFilter:fileFilter })

//creacion

router.get("/crear", controllerAuto.crear)
router.post("/crear", cargar.single("imagen"), controllerAuto.guardado)

//LECTURA
/* router.get("/", controllerAuto.index) */
router.get("/", controllerAuto.listado)

// Se elimina Catalogo - (Catalogo - Borrar 1) ***

router.get("/productCart", controllerAuto.productCart)
router.get("/carrito", controllerAuto.carrito)
router.get("/productDetail", controllerAuto.productDetail)

//DETALLE

router.get("/:id", controllerAuto.detalle)


//UPDATE
router.get("/editar/:id/", controllerAuto.editar)
router.post("/editar/:id", cargar.single("imagen"), controllerAuto.actualizar)

//BORRADO

router.post("/borrar/:id", controllerAuto.borrar)


module.exports = router;
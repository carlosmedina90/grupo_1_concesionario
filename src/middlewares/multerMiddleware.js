const path = require('path');
const multer = require('multer');

let fechaImagen = Date.now()
// definir ruta de los alrchivos a guardar
let storage = multer.diskStorage(
    {
        destination: function (req, file, callback) {
            callback(null, "./public/img/users");
        },
        filename: function (req, file, callback) {
            console.log(file);
            callback(null, fechaImagen + "_" + file.originalname)
        }
    }
)

// Para poder adicionar la anterior direccion

let cargarUsers = multer({ storage })

module.exports = cargarUsers;





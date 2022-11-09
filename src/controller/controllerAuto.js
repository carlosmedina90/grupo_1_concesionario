
let db = require("../database/models");

<<<<<<< HEAD
=======


>>>>>>> ce7e3e3b8b7569e27dbd2b50bc6158a4754626e9
let controllerAuto = {

    crear: function (req, res) {
        db.Marca.findAll()
            .then(function (marcas) {
                return res.render("crearAutos", { marcas: marcas })
            })
    },
    guardado: function (req, res) {
        console.log(req.body);
        db.Auto.create({
            nombreAuto: req.body.nombreauto,
            modelo: req.body.modelo,
            cilindraje: req.body.cilindraje,
            marca_id: req.body.marca,
            color: req.body.color,
            precio: req.body.precio,
            descuento: req.body.descuento,
            textoLargo: req.body.resena,
            imagen: req.file.filename, 
            estado: req.body.estado,
        });
        res.redirect("/autos")

    },
    listado: function (req, res) {
        db.Auto.findAll()
            .then(function (autos) {
                res.render("listadoAutos", { autos: autos })
            })
    },
<<<<<<< HEAD
    // Se eliminar Catalogo - (Catalogo - Borrar 2) ***
=======

    // Se eliminar Catalogo - (Catalogo - Borrar 2) ***


>>>>>>> ce7e3e3b8b7569e27dbd2b50bc6158a4754626e9
    detalle: function (req, res) {
        db.Auto.findByPk(req.params.id, {
            include: [{ association: "marca" }]
        })
            .then(function (auto) {
                res.render("detalleAuto", { auto: auto });
            })
    },
<<<<<<< HEAD
=======

>>>>>>> ce7e3e3b8b7569e27dbd2b50bc6158a4754626e9
    
    editar: function (req, res) {
        let pedidoAuto = db.Auto.findByPk(req.params.id);
        let pedidoMarcas = db.Marca.findAll();
        Promise.all([pedidoAuto, pedidoMarcas])
            .then(function ([auto, marcas]) {
                res.render("editarAuto", { auto: auto, marcas: marcas })
            })
    },
    actualizar: function (req, res) {
 // Si hay imagen nueva se graba por el SI y si no por el NO
        // Ladifirenencia por no se omite grabar la imagen
<<<<<<< HEAD
=======

>>>>>>> ce7e3e3b8b7569e27dbd2b50bc6158a4754626e9
        if(req.body.imagen!="") {
            // let fecha = Date.now();
            // let fileUpdate = req.body.imagen
            // let nuevaimagen = fecha+"-"+ fileUpdate
<<<<<<< HEAD
=======
           
>>>>>>> ce7e3e3b8b7569e27dbd2b50bc6158a4754626e9
            db.Auto.update({
                nombreAuto: req.body.nombreauto,
                modelo: req.body.modelo,
                cilindraje: req.body.cilindraje,
                precio: req.body.precio,
                descuento: req.body.descuento,
                color: req.body.color,
                marca_id: req.body.marca,
                textoLargo: req.body.resena,
                // imagen: req.file.filename,
                imagen: req.body.imagen,
                estado: req.body.estado
            },
                {
                    where: {
                        id: req.params.id
                    }
                },
                );
            res.redirect("/autos/editar/" + req.params.id)
        
        } else {
            db.Auto.update({
                nombreAuto: req.body.nombreauto,
                modelo: req.body.modelo,
                cilindraje: req.body.cilindraje,
                precio: req.body.precio,
                descuento: req.body.descuento,
                color: req.body.color,
                marca_id: req.body.marca,
                textoLargo: req.body.resena,
                estado: req.body.estado
            },
                {
                    where: {
                        id: req.params.id
                    }
                },
                );
            res.redirect("/autos/editar/" + req.params.id)
        }
    
<<<<<<< HEAD
=======

>>>>>>> ce7e3e3b8b7569e27dbd2b50bc6158a4754626e9
},
    borrar: function (req, res) {
        db.Auto.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/autos")
    },
    productCart: (req, res) => {
        res.render("productCart")
    },
    carrito: (req, res) => {
        res.render("carrito")
    },
    productDetail: (req, res) => {
        res.render("productDetail")
    },
    index: (req, res) => {
        // Do the magic
<<<<<<< HEAD
=======

>>>>>>> ce7e3e3b8b7569e27dbd2b50bc6158a4754626e9
        res.render("index",)
    },
}

module.exports = controllerAuto
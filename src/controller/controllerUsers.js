let db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');



let controllerUsers = {

    // Se liminan Login y register deben ir en el Main -(login y Register 4) *?????*

    register: (req, res) => {
        db.category.findAll()
            .then(function (category) {
                return res.render("register", { category: category })
            })
    },
    guardado: async (req, res) => {
        const resultValidation = validationResult(req)
        //mapped convierte un array en un objetio literal
        if (resultValidation.errors.length > 0) {
            return res.render("Register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        /*  let userInDB = User.findByField('email', req.body.email); */
        let pedidoUser = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (pedidoUser) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }
        if (!pedidoUser) {
            db.Users.create({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                imagen: req.file.filename,
                category_id: req.body.category,
            });
            res.redirect("/users/login")
        } else {
            console.log("El usuario existe")
            res.redirect("/users/register")
        }
    },
    login: (req, res) => {
        res.render("login")
    },
    processLogin: async (req, res) => {
        let userToLogin = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (userToLogin) {
            let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (isOkPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin
                if (req.body.remember_user) {
                    console.log(req.cookies.userEmail);
                    res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2 })
                } return res.redirect("/users/opciones")
            }
            return res.render("login",
                {
                    errors: {
                        email: {
                            msg: "Las credenciales son invalidas"
                        }
                    }
                })
        }
        return res.render("login",
            {
                errors: {
                    email: {
                        msg: "Email no esta registrado"
                    }
                }
            })
    },
    opciones: (req, res) => {
            res.render('opciones', {
            user: req.session.userLogged
        })
    },
    logout: (req, res) => {
        res.clearCookie("userEmail")
        req.session.destroy();
        return res.redirect('/');
    },

    listado: function (req, res) {
        db.Users.findAll()
            .then(function (users) {
                res.render("listadoUsers", { users: users })
            })
    },
    editar: function (req, res) {
        let pedidoUser = db.Users.findByPk(req.params.id);
        let pedidoCategory = db.category.findAll();
        Promise.all([pedidoUser, pedidoCategory])
            .then(function ([users, category]) {
                res.render("editarRegister", { users: users, category: category })
            })
    },
    actualizar: function (req, res) {
        let fecha = Date.now();
        let fileUpdate = req.body.imagen
        console.log("/////////////////////")
        console.log(fecha + "_" + fileUpdate)
        console.log("/////////////////////")
        db.Users.update({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            descuento: req.body.descuento,
            imagen: req.body.imagen,
            category: req.body.category
        },
            {
                where: {
                    id: req.params.id
                }
            },
        );
        if (req.file) {
            imagen: req.body.imagen;
        };
        res.redirect("/users/editar/" + req.params.id)
    },
    borrar: function (req, res) {
        db.Users.destroy({
            
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users")
    },

    Bienvenida: function (req, res, next) {
        db.Users.findAll()
            .then(function (users) {
                res.render("opciones", { users: users })
            })


        /*  console.log("data",req.body) */

        /*      const user =req.body;
      
              res.render("opciones",{user}) */

    }

}



module.exports = controllerUsers
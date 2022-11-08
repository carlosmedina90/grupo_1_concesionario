const path = require('path');
const db = require('../../database/models');

const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
// const Movies = db.Movie;
// const Genres = db.Genre;
// const Actors = db.Actor;


const usuariosAPIController = {
    'list': (req, res) => {
        try{
            db.Users.findAll({})
            .then(usuarios => {
                let respuesta = {
                    meta: {
                        status : 200,
                        total: usuarios.length,
                        url: 'api/users'
                    },
                    data: usuarios
                }
                    res.json(respuesta);
                })
            }catch(error){
                let mensaje="ERROR: " + error
                res.render("error",{error})
        }
    },
        
    'DetalleUsuario': (req, res) => {
        try{
            console.log(req.params.id)
            db.Users.findByPk(req.params.id,{ })
                .then(usuarios => {
                    let respuesta = {
                        meta: {
                            status: 200,
                            total: usuarios.length,
                            url: '/api/usuarios/:req.params.id'
                        },
                        data: usuarios
                    }
                    res.json(respuesta);
                });
            }catch(error){
                let mensaje="ERROR: " + error
                res.render("error",{error})
        }
    },
}

module.exports = usuariosAPIController;
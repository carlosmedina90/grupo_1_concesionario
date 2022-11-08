const path = require("path");
const db = require("../../database/models");

const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

//Aqui tienen otra forma de llamar a cada uno de los modelos
// const Movies = db.Movie;
// const Genres = db.Genre;
// const Actors = db.Actor;

const cartAPIController = {
  list: (req, res) => {
    try {
      db.Cart.findAll({
        include: ["user", "auto"],
      }).then((cart) => {
        let respuesta = {
          meta: {
            status: 200,
            total: cart.length,
            url: "api/cart",
          },
          data: cart,
        };
        res.json(respuesta);
      });
    } catch (error) {
      let mensaje = "ERROR: " + error;
      res.render("error", { error });
    }
  },
  detalleCart: (req, res) => {
    try {
      db.Cart.findOne({
        where: {
          user_id: req.params.id,
        },
      }).then((cart) => {
        let respuesta = {
          meta: {
            status: 200,
            url: "/api/cart/:req.params.id",
          },
          data: cart,
        };
        res.json(respuesta);
      });
    } catch (error) {
      let mensaje = "ERROR: " + error;
      res.render("error", { error });
    }
  },
  create: async (req, res) => {
    const findCart = await db.Cart.findOne({
      where: {
        auto_id: req.body.auto_id,
        user_id: req.body.user_id,
      },
    });

    if (findCart === null) {
      db.Cart.create({
        auto_id: req.body.auto_id,
        user_id: req.body.user_id,
        reference: req.body.reference,
        quantity: req.body.quantity,
        price: req.body.price,
      })
        .then((confirm) => {
          let respuesta;
          if (confirm) {
            respuesta = {
              meta: {
                status: 200,
                total: confirm.length,
                url: "api/cart/create",
              },
              data: confirm,
            };
          } else {
            respuesta = {
              meta: {
                status: 200,
                total: confirm.length,
                url: "api/cart/create",
              },
              data: confirm,
            };
          }
          res.json(respuesta);
        })
        .catch((error) => res.send(error));
    } else {
      db.Cart.update(
        {
          quantity: findCart.quantity + 1,
        },
        {
          where: { id: findCart.id },
        }
      )
        .then((confirm) => {
          let respuesta;
          if (confirm) {
            respuesta = {
              meta: {
                status: 200,
                total: confirm.length,
                url: "api/cart/create",
              },
              data: confirm,
            };
          } else {
            respuesta = {
              meta: {
                status: 200,
                total: confirm.length,
                url: "api/cart/create",
              },
              data: confirm,
            };
          }
          res.json(respuesta);
        })
        .catch((error) => res.send(error));
    }
  },
  update: (req, res) => {
    let movieId = req.params.id;
    Movies.update(
      {
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      },
      {
        where: { id: movieId },
      }
    )
      .then((confirm) => {
        let respuesta;
        if (confirm) {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/movies/update/:id",
            },
            data: confirm,
          };
        } else {
          respuesta = {
            meta: {
              status: 204,
              total: confirm.length,
              url: "api/movies/update/:id",
            },
            data: confirm,
          };
        }
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },
  destroy: (req,res) => {
    let cartId = req.params.id;
    db.Cart
    .destroy({where: {id: cartId}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(confirm => {
        let respuesta;
        if(confirm){
            respuesta ={
                meta: {
                    status: 200,
                    total: confirm.length,
                    url: 'api/cart/destroy/:id'
                },
                data:confirm
            }
        }else{
            respuesta ={
                meta: {
                    status: 204,
                    total: confirm.length,
                    url: 'api/cart/destroy/:id'
                },
                data:confirm
            }
        }
        res.json(respuesta);
    })    
    .catch(error => res.send(error))
}
  /*
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,
            {
                include : ['genre']
            })
            .then(movie => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: movie.length,
                        url: '/api/movie/:id'
                    },
                    data: movie
                }
                res.json(respuesta);
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            include: ['genre'],
            where: {
                rating: {[db.Sequelize.Op.gte] : req.params.rating}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
        .then(movies => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: movies.length,
                    url: 'api/movies/recomended/:rating'
                },
                data: movies
            }
                res.json(respuesta);
        })
        .catch(error => console.log(error))
    },
    create: (req,res) => {
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let movieId = req.params.id;
        Movies.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
    */
};

module.exports = cartAPIController;

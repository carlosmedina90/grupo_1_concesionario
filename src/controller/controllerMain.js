let db = require("../database/models");

let controllerMain = {
  index: (req, res) => {
    db.Marca.findAll().then(function (autos) {
      return res.render("index");
    });
  },
  indexCarrito: (req, res) => {
    db.Cart.findAll({
      where: {
        user_id: res.locals?.userLogged?.id || 0,
      },
    }).then((cart) => {
      res.render("indexCarrito", { cart: cart });
    });
  },
  compra: (req, res) => {
    return res.render("compra");
  },

  // Se trae de ControllerAuto y debe eliminarse de allá - (Catalogo 3) *** 15 a 29
  catalogo: function (req, res) {
    db.Auto.findAll().then(function (autos) {
      res.render("catalogoAutos", { autos: autos });
    });
  },

  catalogoDetalle: function (req, res) {
    db.Auto.findByPk(req.params.id, {
      include: [{ association: "marca" }],
    }).then(function (auto) {
      res.render("detalleAuto", { auto: auto });
    });
  },

  // El register queda pendiente de implementar, debe poder crear un usuario categoria 3
  // y debe poder modificar sus datos en caso de error -(login y Register 3) *?????*
  register: (req, res) => {
    res.render("register");
  },

  /* opciones: (req, res) => {
        res.render("opciones")
    }, */

  search: (req, res) => {
    const search = req.query.keywords.toLowerCase();
    const autosFilter = Auto.filter((elemento) => {
      return elemento.nombreAuto.toLowerCase().includes(search);
    });
    console.log(autosFilter);
    console.log(search);
    res.render("results", { autosFilter, search });
  },
};

module.exports = controllerMain;

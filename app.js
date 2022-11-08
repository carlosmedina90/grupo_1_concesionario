let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
let session = require("express-session");
const cors = require("cors"); // *** API 1

//Middleware de app
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");

// Requerimos las rutas del proyecto
let mainRouter = require("./src/routes/rutaMain");
let usersRouter = require("./src/routes/rutaUsers");
let autosRouter = require("./src/routes/rutaAuto");

// Requerimos las rutas de las API                          *** API 2
const autosAPIRouter = require("./src/routes/api/autosAPIRouter");
const cartAPIRouter = require("./src/routes/api/cartAPIRouter");
const marcasAPIRouter = require("./src/routes/api/marcasAPIRouter");
const usuariosAPIRouter = require("./src/routes/api/usuariosAPIRouter");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  session({
    secret: "es un secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(userLoggedMiddleware);
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.static(path.join(__dirname, "public")));

// Activamos el uso de otro dominio en nuectra aplicacion    *** API 3
app.use(cors());

// utilizando las rutas del proyecto
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/autos", autosRouter);

// Utilizamos las rutas de las APIs              ** API 4
app.use("/api/autos", autosAPIRouter);
app.use("/api/cart", cartAPIRouter);
app.use("/api/marcas", marcasAPIRouter);
app.use("/api/usuarios", usuariosAPIRouter);
app.use("/api/usuariosDetalle", usuariosAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

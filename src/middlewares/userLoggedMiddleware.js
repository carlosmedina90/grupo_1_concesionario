/* const User = require('../database/User'); */
let User = require("../database/models/Users");
function userLoggedMiddleware(req, res, next) {

	res.locals.isLogged = false; // variables que peudo pasar por todas las vistas

	

	if(req.session && req.session.userLogged ){
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged; // paso lo que tengo en session a una variable local
	}

	/* let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	} */

	next();
}

module.exports = userLoggedMiddleware;
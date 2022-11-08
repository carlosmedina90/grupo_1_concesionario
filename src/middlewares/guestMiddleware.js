function guestMiddleware(req, res, next) {
	//si tengo alguine en session login activo
	if (req.session.userLogged) {
		return res.redirect('/users/opciones');
	}
	next();
}

module.exports = guestMiddleware;
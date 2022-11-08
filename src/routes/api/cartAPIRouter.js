const express = require('express');
const router = express.Router();
const cartAPIController = require('../../controller/api/cartAPIController');

//Rutas
//Listado del carrito
router.get('/', cartAPIController.list);


//Detalle de un carrito
router.get('/:id', cartAPIController.detalleCart);
//Filtrar películas por rating. Puede colocar desde 1 hasta 10
// router.get('/recomended/:rating', moviesAPIController.recomended);
//Agregar una película
router.post('/create', cartAPIController.create);
//Modificar una película
// router.put('/update/:id', moviesAPIController.update);
//Eliminar una película
router.delete('/delete/:id', cartAPIController.destroy);

module.exports = router;
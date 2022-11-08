const express = require('express');
const router = express.Router();
const autosAPIController = require('../../controller/api/autosAPIController');



//Rutas
//Listado de autos
router.get('/', autosAPIController.list);


//Detalle de una película
 router.get('/:id', autosAPIController.DetalleAuto);
//Filtrar películas por rating. Puede colocar desde 1 hasta 10
// router.get('/recomended/:rating', moviesAPIController.recomended);
//Agregar una película
// router.post('/create', moviesAPIController.create);
//Modificar una película
// router.put('/update/:id', moviesAPIController.update);
//Eliminar una película
// router.delete('/delete/:id', moviesAPIController.destroy);

module.exports = router;
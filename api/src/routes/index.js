const { Router } = require('express');
const RouterDog = require('../routes/RouterDog')
const RouterTemperament = require ('./RouterTemperament')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', RouterDog);
router.use('/temperaments', RouterTemperament);

module.exports = router;

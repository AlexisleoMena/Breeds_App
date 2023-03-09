const { Router } = require('express');
const breedRouter = require("./breed.router.js");
const temperamentRouter = require("./temperament.router.js");

const router = Router();
router.use( "/breeds", breedRouter );
router.use( "/temperaments", temperamentRouter );

module.exports = router;

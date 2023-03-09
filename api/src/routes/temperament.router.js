const { Router } = require("express");
const { get_temperaments } = require("../controllers/temperament.controller");

const router = Router();

//http://localhost:3001/temperaments
router.get( "/", get_temperaments)

module.exports = router;
const { Router } = require("express");
const { get_Breeds, create_Breed, get_breed_by_id, delete_Breed, update_Breed } = require("../controllers/breed.controller");
const validateForm = require("../utils/middlewares/validateForm.js")

const router = Router();

//http://localhost:3001/breeds
router.get("/", get_Breeds);

//http://localhost:3001/breeds/1
router.get("/:id", get_breed_by_id);

/* 
{
  "name": "Some Breed",
  "height_max": 5,
  "height_min": 4.5,
  "weight_max": 25,
  "weight_min": 24,
  "life_span": "12",
  "image": "",
  "origin": "",
  "temperaments": ["Active", "Adaptable"]
}
*/
router.post("/", validateForm, create_Breed);

//http://localhost:3001/breeds/2cfde294-4262-4f81-9b35-6358b6a1b17c
router.put("/:id", update_Breed)

//http://localhost:3001/breeds/2cfde294-4262-4f81-9b35-6358b6a1b17c
router.delete("/:id", delete_Breed)

module.exports = router;
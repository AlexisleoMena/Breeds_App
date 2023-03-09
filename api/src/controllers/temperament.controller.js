const axios = require("axios");
const { Temperament } = require("../db.js");

async function apiTemperaments() {
  let { data } = await axios("https://api.thedogapi.com/v1/breeds");
  let temperamentalBreeds = data.filter( (d) => d.hasOwnProperty('temperament')); //Ex: Breed Wirehaired Vizsla not temperament
  let allTemperaments = temperamentalBreeds.map( ({temperament}) => temperament.split(", ") ).flat(1);
  allTemperaments = Array.from(new Set(allTemperaments)).sort();
  return allTemperaments.map((t) => ({ name: t }));
}

async function get_temperaments(req, res) {
  try {
    let temperamentsInDB = await Temperament.findAll();
    if(!temperamentsInDB.length) {
      let temperaments = await apiTemperaments();
      temperamentsInDB  = await Temperament.bulkCreate(temperaments);
    }
    res.status(200).json(temperamentsInDB)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  get_temperaments
};


const axios = require("axios");
const { Breed, Temperament } = require("../db.js");
const { v4: uuidv4, validate } = require("uuid");

function valuesToReturnFromTheAPI(obj) {
  let weights = obj.weight.imperial.split(/\s\-\s|\s\–\s/);
  let heights = obj.height.imperial.split(/\s\-\s|\s\–\s/);
  let life_span = obj.life_span.replace(/\syears|Years\syears/, "").split(/\s\-\s|\s\–\s/);
  return {
    id: Number(obj.id),
    name: obj.name,
    weight: obj.weight.imperial+" lb",
    height: obj.height.imperial+" in",
    life_span: obj.life_span,
    image: obj.image.url,
    origin: obj.origin?.length ? obj.origin : "Unknown origin",
    temperaments: obj.temperament?.length ? obj.temperament : "Unknown temperaments",
    weight_max: parseFloat(weights[weights.length-1]),
    height_max: parseFloat(heights[heights.length - 1]),
    life_span_max: Number(life_span[life_span.length - 1]),
  }
}

async function APIsbreeds() {
  let { data } = await axios("https://api.thedogapi.com/v1/breeds");
  return data.map(valuesToReturnFromTheAPI)
}

function valuesToReturnFromTheDB(flattenedObject) {
  return {
    id: flattenedObject.id,
    name: flattenedObject.name,
    weight: `${flattenedObject.weight_min} - ${flattenedObject.weight_max} lb`,
    height: `${flattenedObject.height_min} - ${flattenedObject.height_max} in`,
    life_span: flattenedObject.life_span + " years",
    image: flattenedObject.image,
    origin: flattenedObject.origin,
    temperaments: flattenedObject.temperaments.map(((t) => t.name)).join(", "),
    weight_max: flattenedObject.weight_max,
    height_max: flattenedObject.height_max,
    life_span_max: flattenedObject.life_span,
  }
}

async function DataBasesBreeds() {
  let breedsInDB = await Breed.findAll({ include: { model: Temperament, as: "temperaments" } });
  return !breedsInDB.length
    ? breedsInDB
    : breedsInDB.map( (breed) => valuesToReturnFromTheDB(breed.toJSON()));
}

async function get_Breeds(req, res) {
  const { name } = req.query;
  try {
    const APIsData = await APIsbreeds();
    const DataBasesData = await DataBasesBreeds();
    let breeds = DataBasesData.concat(APIsData);
    if( name ) {
      let nameTrimed = name.replace(/^\s+|\s+$/,'');
      let regEx = new RegExp(`^${nameTrimed}`, 'i');
      breeds = breeds.filter( (breed) => regEx.test(breed.name));
      if(!breeds.length) return res.status(404).json({msg: `No matches for ${nameTrimed}`});
      return res.status(200).json(breeds);
    }
    res.status(200).json(breeds);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function get_breed_by_id (req, res) {
  let id = req.params.id;
  if (validate(id)) {
    try {
      const searched = await Breed.findByPk(id, { include: { model: Temperament, as: "temperaments" }});
      if (!searched) return res.status(404).json({ msg: "There is not breed with that id!"});
      return res.json(valuesToReturnFromTheDB(searched.toJSON()));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  let breeds = await APIsbreeds();
  let searched = breeds.find( (b) => b.id === Number(id));
  if(!searched) return res.status(404).json({ msg: "There is not breed with that id!"});
  res.json(searched);
}

async function create_Breed(req, res) {
  let id = uuidv4();
  try {
    let newBreed = await Breed.create({ ...req.body, id });
    let temperamentsInDB = await Temperament.findAll({ where: { name: req.body.temperaments } });
    await newBreed.addTemperament(temperamentsInDB);
    res.status(201).json({ msg: "Breed created successfully!" });
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

async function update_Breed(req, res) {
  try {
    let updateBreeds = await Breed.update({...req.body }, { where: {id: req.params.id}});
    if(!updateBreeds) return res.status(404).json({ msg: "There is not Breed with that id!"})
    const updated = await Breed.findByPk(req.params.id);
    let temperamentsInDB = await Temperament.findAll({ where: { name: req.body.temperaments } });
    await updated.setTemperaments(temperamentsInDB);
    return res.status(200).json({ msg: "Breed/s updated successfully!" });
  }catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

async function delete_Breed(req, res) {
  try {
    let deletedBreeds = await Breed.destroy({ where: {id: req.params.id}});
    // if(deletedBreeds) return res.status(204).json({});
    if(deletedBreeds) return res.status(200).json({ msg: "Breed/s deleted successfully!" });
    res.status(404).json({ msg: "There is not Breed with that id!"})
  }catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  get_Breeds,
  create_Breed,
  get_breed_by_id,
  update_Breed,
  delete_Breed
};

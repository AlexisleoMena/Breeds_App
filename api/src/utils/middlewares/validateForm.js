function validateForm(req, res, next) {
  const { 
    name,
    height_min,
    height_max,
    weight_min,
    weight_max
  } = req.body;
  if( !name || !height_min || !height_max || !weight_min || !weight_max)
  return res.status(400).json({ msg: "Some parameters are missing!" })
  next();
}
module.exports = validateForm;
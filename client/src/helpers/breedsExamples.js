let arrayBreeds = [
  {
    name: "Poodle (Toy)",
    img: "https://cdn2.thedogapi.com/images/rJFJVxc4m.jpg"
  },
  {
    name: "Pug",
    img: "https://cdn2.thedogapi.com/images/HyJvcl9N7.jpg" 
  },
  {
    name: "Norwich Terrier",
    img: "https://cdn2.thedogapi.com/images/BkgKXlqE7.jpg" 
  },
  {
    name: "Lhasa Apso",
    img: "https://cdn2.thedogapi.com/images/SJp7Qe5EX.jpg" 
  },
  {
    name: "Samoyed",
    img: "https://cdn2.thedogapi.com/images/S1T8Ee9Nm.jpg" 
  }
]

module.exports = function arrayRandomBreeds(cant, array=arrayBreeds) {
  if(cant >= array.length) return array;
  let arrayResult = [];
  while(arrayResult.length < cant) {
    let randomIndex = Math.ceil(Math.random()*(array.length-1));
    if(!arrayResult.includes(array[randomIndex])) {
      arrayResult.push(array[randomIndex]);
    }
  }
  return arrayResult;
}

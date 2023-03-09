const { conn, Breed } = require("../../src/db");
let breed = {
  name: "Some Breed",
  height_max: 5,
  height_min: 4.5,
  weight_max: 25,
  weight_min: 24,
  life_span: "12",
  image: "",
  origin: "",
  temperaments: ["Active", "Adaptable"]
}

describe("BREED MODEL: ", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("------ Breed validations ------", () => {
    beforeEach( async () => await Breed.sync({ force: true }));
    describe("Property 'name'", () => {
      it("It should throw an error if the name property is an empty string", (done) => {
        Breed
          .create({...breed, name: ""})
          .then(() => done(new Error("should not instantiate the model if the name property is an empty string")))
          .catch(() => done())
      });
      it("It should throw an error if the name property is null",  (done) => {
        Breed
        .create({...breed, name: null})
        .then(() => done(new Error("should not instantiate the model if the name property is null")))
        .catch(() => done())
      });
    });
  });
});

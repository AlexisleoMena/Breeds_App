const { conn, Temperament } = require("../../src/db");


describe("TEMPERAMENT MODEL: ", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("------ Temperament validations ------", () => {
    beforeEach( async () => await Temperament.sync({ force: true }));
    describe("Property 'name'", () => {
      it("It should throw an error if the name property is an empty string", (done) => {
        Temperament
          .create({ name: ""})
          .then(() => done(new Error("should not instantiate the model if the name property is an empty string")))
          .catch(() => done())
      });
      it("It should throw an error if the name property is null",  (done) => {
        Temperament
        .create({})
        .then(() => done(new Error("should not instantiate the model if the name property is null")))
        .catch(() => done())
      });
    });
  });
});

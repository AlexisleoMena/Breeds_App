const { conn, Breed } = require("../../src/db");
const session = require("supertest-session")
const app = require("../../src/app.js")
const agent = session(app);

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
describe("Breed routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(async () => await Breed.sync({ force: true }));
  
  describe("GET /breeds", () => {
    it("should get 200", async () => {
      await agent.get("/breeds").expect(200);
    }); 
  }).timeout(10000);

  describe("POST /breeds", () => {
    it("should get 201", async () => {
      await agent.post("/breeds").send(breed).expect(201);
    }); 
  });
});

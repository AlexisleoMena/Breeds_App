const { conn, Temperament } = require("../../src/db");
const session = require("supertest-session")
const app = require("../../src/app.js")
const agent = session(app);

describe("Temperament routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(async () => await Temperament.sync({ force: true }));
  
  describe("GET /temperaments", () => {
    it("should get 200", async () => {
      await agent.get("/temperaments").expect(200);
    }); 
  }).timeout(10000);

});
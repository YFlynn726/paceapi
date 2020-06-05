// const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  context("Given there is data in the database", () => {
    it("GET /api/users responds with 200 and all of the users", () => {
      return supertest(app).get("/api/users").expect(200);
    });

    it("POST /api/users responds with 201", () => {
      newUser = {
        first_name: "John",
        last_name: "Bob",
      };
      return supertest(app).post("/api/users").send(newUser).expect(201);
    });

    it("GET /api/items responds with 200 and all of the items", () => {
      return supertest(app).get("/api/items").expect(200);
    });

    it("POST /api/items responds with 201", () => {
      newItem = {
        pace: 6,
        user_id: 3,
        content: "I have to poo",
      };
      return supertest(app).post("/api/items").send(newItem).expect(201);
    });
  });
});

describe(`GET /api/users/:user_id`, () => {
  it(`responds with 200`, () => {
    const userId = 1;
    return supertest(app).get(`/api/users/${userId}`).expect(200);
  });
});

describe(`GET /api/items/:item_id`, () => {
  it(`responds with 200`, () => {
    const itemId = 6;
    return supertest(app).get(`/api/items/${itemId}`).expect(200);
  });

  it("PATCH /api/items/:item_id responds with 201", () => {
    const itemId = 6;

    newUpdate = {
      pace: 8,
      content: "I need water",
    };
    return supertest(app)
      .patch(`/api/items/${itemId}`)
      .send(newUpdate)
      .expect(201);
  });

  it("DELETE /api/items/:item_id responds with 204", () => {
    const itemId = 6;

    return supertest(app).delete(`/api/items/${itemId}`).expect(204);
  });
});

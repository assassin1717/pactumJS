const { spec } = require("pactum");

let s;

beforeEach(() => {
  s = spec();
});

afterEach(async () => {
  if (s && s._response) {
    console.log("👉 Response body:", s._response.body);
  }
});

describe("GET /users contract", () => {
  it("should return a list of users", async () => {
    s.get("/users")
      .expectStatus(200)
      .expectJsonSchema({
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            address: { type: ["string", "null"] },
          },
          required: ["id", "name", "email", "phone"],
        },
      });

    await s.toss();
  });

  it("should return a valid user object", async () => {
    s.get("/users/1")
      .expectStatus(200)
      .expectJsonSchema({
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          address: { type: ["string", "null"] },
        },
        required: ["id", "name", "email", "phone"],
      });

    await s.toss();
  });

  it("should not return a valid user object", async () => {
    s.get("/users/1000").expectStatus(404);

    await s.toss();
  });
});

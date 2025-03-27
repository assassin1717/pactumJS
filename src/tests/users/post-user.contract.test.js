const { spec } = require("pactum");
const { faker } = require("@faker-js/faker");

let s;

beforeEach(() => {
  s = spec();
});

afterEach(async () => {
  if (s && s._response) {
    console.log("👉 Response body:", s._response.body);
  }
});

describe("POST /users contract", () => {
  it("should create a user with mandatory dynamic data", async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("91########"),
    };

    console.log("➡️ Request body:", payload);

    s.post("/users")
      .withJson(payload)
      .expectStatus(201)
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

  it("should create a user with all fields dynamic data", async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("91########"),
      address: faker.location.streetAddress(),
    };

    console.log("➡️ Request body:", payload);

    s.post("/users")
      .withJson(payload)
      .expectStatus(201)
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

  it("should not create a user with invalid property name", async () => {
    const payload = {
      email: faker.internet.email(),
      phone: faker.phone.number("91########"),
      address: faker.location.streetAddress(),
    };

    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });

  it("should not create a user with invalid property email", async () => {
    const payload = {
      name: faker.person.fullName(),
      phone: faker.phone.number("91########"),
      address: faker.location.streetAddress(),
    };

    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });

  it("should not create a user with invalid property phone", async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
    };

    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });

  it("should not create a user with empty payload", async () => {
    const payload = {};

    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });
});

async function sendRequest(payload) {
  s.post("/users").withJson(payload).expectStatus(400);

  await s.toss();
}

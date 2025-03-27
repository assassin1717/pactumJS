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

describe("PUT /users contract", () => {
  it("should update a user property name with dynamic data", async () => {
    const payload = {
      name: faker.person.fullName(),
    };

    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });

  it("should update a user property email with dynamic data", async () => {
    const payload = {
      email: faker.internet.email(),
    };

    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });

  it("should update a user property phone with dynamic data", async () => {
    const payload = {
      phone: faker.phone.number("91########"),
    };

    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });

  it("should update a user property address with dynamic data", async () => {
    const payload = {
      address: faker.location.streetAddress(),
    };
    console.log("➡️ Request body:", payload);

    await sendRequest(payload);
  });

  it("should not update a user with dynamic data", async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("91########"),
      address: faker.location.streetAddress(),
    };

    console.log("➡️ Request body:", payload);

    s.patch("/users/1000").withJson(payload).expectStatus(404);

    await s.toss();
  });
});

async function sendRequest(payload) {
  s.patch("/users/1")
    .withJson(payload)
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
}

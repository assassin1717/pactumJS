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
  it("should delete a valid user object", async () => {
    s.delete("/users/5").expectStatus(204);

    await s.toss();
  });

  it("should not delete a invalid user object", async () => {
    s.delete("/users/1000").expectStatus(404);

    await s.toss();
  });
});

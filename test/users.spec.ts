import { expect, test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("O usuario deve ser capaz de criar uma conta!", async () => {
  await request(app.server)
    .post("/users")
    .send({
      name: "dsafghj",
      email: "asdasdasd@gmail.com",
    })
    .expect(201);
});

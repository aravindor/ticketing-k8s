import request from "supertest";
import { app } from "../../app";

it("Fails when an incorrect cred given", async () => {
  return request(app)
    .post("/api/users/sign-in")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(400);
});

it("Fails when an incorrect pass given", async () => {
  await request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);
  await request(app)
    .post("/api/users/sign-in")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(200);
  await request(app)
    .post("/api/users/sign-in")
    .send({
      email: "test@test.com",
      password: "test-wrong",
    })
    .expect(400);
});

it("It responds with cookie", async () => {
  await request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);

  const resp = await request(app)
    .post("/api/users/sign-in")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(200);
  expect(resp.get("Set-Cookie")).toBeDefined();
});

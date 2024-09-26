import request from "supertest";
import { app } from "../../app";

it("Returns a 201", async () => {
  return request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);
});

it("Returns 400 invalid email", async () => {
  return request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test!test.com",
      password: "test",
    })
    .expect(400);
});

it("Disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);
    await request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(400);
});

it("sets a cookie on success", async () => {
   const response =  await request(app)
      .post("/api/users/sign-up")
      .send({
        email: "test@test.com",
        password: "test",
      })
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined()
  });
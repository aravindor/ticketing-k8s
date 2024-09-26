import request from "supertest";
import { app } from "../../app";

it("It responds with details about current user", async () => {

  const cookie = await global.signin()
  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }

  const currentUserResp = await request(app)
    .get("/api/users/current-user")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(currentUserResp.body.currentUser.email).toEqual("test@test.com");
});

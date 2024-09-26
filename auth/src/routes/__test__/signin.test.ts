import request from "supertest"
import { app } from "../../app"

it("Fails when an incorrect pass given",async()=>{
    await request(app).post("/api/users/sign-in")
})
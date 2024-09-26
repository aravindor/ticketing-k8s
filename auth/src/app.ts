import express from "express";
import 'express-async-errors';
import { json } from "express";
import { currentUserRoute } from "./routes/current_user";
import { signInRoute } from "./routes/signin";
import { signOutRoute } from "./routes/signout";
import { signUpRoute } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not_found_error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUserRoute);
app.use(signInRoute);
app.use(signOutRoute);
app.use(signUpRoute);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export {app}
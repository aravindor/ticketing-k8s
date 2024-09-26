import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad_request_error";
import { Password } from "../services/passwords";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-requests";
const router = express.Router();

router.post(
  "/api/users/sign-in",
  [
    body("email").notEmpty().isEmail().withMessage("Enter a valid email"),
    body("password").trim().notEmpty().withMessage("Please provide valid pass"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("User not found");
    }
    const authSuccess = await Password.comparePass(
      existingUser.password,
      password
    );
    if (!authSuccess) {
      throw new BadRequestError("User not found");
    }
    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    console.log("JWT:", userJwt);

    req.session = {
      jwt: userJwt,
    };
    return res.json(existingUser.toJSON());
  }
);

export { router as signInRoute };

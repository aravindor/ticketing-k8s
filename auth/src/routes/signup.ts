import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad_request_error";
import { validateRequest } from "../middlewares/validate-requests";
const router = express.Router();

router.post(
  "/api/users/sign-up",
  [
    body("email").notEmpty().isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 2, max: 10 }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    // throw new DatabaseConnectionError();
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }
    const user = User.build({ email, password });
    if (!process.env.JWT_KEY) {
      throw Error("Env variable not configured");
    }
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY
    );
    console.log("JWT:", userJwt);

    req.session = {
      jwt: userJwt,
    };
    await user.save();
    return res.status(201).json(user.toJSON());
  }
);

export { router as signUpRoute };

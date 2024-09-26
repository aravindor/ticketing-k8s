import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if(!process.env.JWT_KEY){
    throw Error("Env variable not configured")
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-service/auth");
    console.log("Db connected");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Server started on 3000!");
  });
};

start();

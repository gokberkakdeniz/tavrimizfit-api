import { doesNotMatch } from "assert";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User, { IUser } from "./models/User";
import { login, register } from "./controllers/users";

dotenv.config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("!!!");
});

// register("hakan", "123456", "hakotest@test.com");
// login("fiko", "123456");

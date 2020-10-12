import dotenv from "dotenv";
import mongoose from "mongoose";
import User, { IUser } from "./models/User";

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("!!!");
});

const user: IUser = new User({
  username: "jhfhdhgf",
  password: "sfsdfds",
  email: "sdfsfsdfds",
  type: "normal",
});

user
  .save()
  .then(() => console.log("ok"))
  .catch((err) => console.log(err));

import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

import * as authController from "./controllers/authController";
import * as userController from "./controllers/userController";
import * as recipeController from "./controllers/recipeController";

import permit from "./middlewares/permit";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("could not connect to database.");
    console.error(err);
    process.exit();
  });

mongoose.set("runValidators", true);

app.use(express.json());
app.set("port", process.env.PORT || 3000);
app.post("/login", permit("anonymous"), authController.login);
app.post("/register", permit("anonymous"), authController.register);
app.patch(
  "/profile/details",
  permit("normal", "premium"),
  userController.updateDetails
);
app.post("/recipes", permit("normal", "premium"), recipeController.addRecipe);
app.get("/recipes", permit("normal", "premium"), recipeController.getRecipes);

app.listen(app.get("port"), () => {
  console.log(
    "app is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

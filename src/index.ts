import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

import * as authController from "./controllers/authController";
import * as userController from "./controllers/userController";
import * as recipeController from "./controllers/recipeController";
import * as tutorialController from "./controllers/tutorialController";
import * as trainingController from "./controllers/trainingController";

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
  "/profile",
  permit("normal", "premium", "admin"),
  userController.update
);

app.post("/recipes", permit("admin"), recipeController.create);
app.patch("/recipes/:id", permit("admin"), recipeController.update);
app.delete("/recipes/:id", permit("admin"), recipeController.remove);
app.get(
  "/recipes",
  permit("normal", "premium", "admin"),
  recipeController.readAll
);
app.get(
  "/recipes/:id",
  permit("normal", "premium", "admin"),
  recipeController.read
);

app.post("/tutorials", permit("admin"), tutorialController.create);
app.patch("/tutorials/:id", permit("admin"), tutorialController.update);
app.delete("/tutorials/:id", permit("admin"), tutorialController.remove);
app.get(
  "/tutorials",
  permit("normal", "premium", "admin"),
  tutorialController.readAll
);
app.get(
  "/tutorials/:id",
  permit("normal", "premium", "admin"),
  tutorialController.read
);

app.post("/trainings", permit("admin"), trainingController.create);
app.patch("/trainings/:id", permit("admin"), trainingController.update);
app.delete("/trainings/:id", permit("admin"), trainingController.remove);
app.get(
  "/trainings",
  permit("normal", "premium", "admin"),
  trainingController.readAll
);
app.get(
  "/trainings/:id",
  permit("normal", "premium", "admin"),
  trainingController.read
);

app.listen(app.get("port"), () => {
  console.log(
    "app is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

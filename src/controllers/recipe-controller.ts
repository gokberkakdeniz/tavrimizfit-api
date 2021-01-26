import { Response, Request } from "express";
import Recipe, { IRecipe } from "../models/Recipe";
import $ from "../messages";
import { extract } from "../helpers";

export const read = (req: Request, res: Response): void => {
  Recipe.findById({ _id: req.params.id })
    .then((recipe) => {
      res.send({
        error: false,
        data: recipe,
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

export const readAll = async (req: Request, res: Response): Promise<void> => {
  Recipe.find()
    .then((recipes) => {
      res.send({
        error: false,
        data: recipes,
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

export const remove = (req: Request, res: Response): void => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({
        error: false,
        message: $("success.removed"),
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

export const update = (req: Request, res: Response): void => {
  const body = extract(req.body, "tags", "ingredients", "title", "description");

  Recipe.updateOne({ _id: req.params.id }, body)
    .then(() => {
      res.send({
        error: false,
        message: $("success.updated"),
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

export const create = (req: Request, res: Response): void => {
  const { title, tags, description, ingredients, calorie } = req.body;
  const recipe: IRecipe = new Recipe({
    title,
    tags,
    description,
    ingredients,
    calorie,
  });

  recipe
    .save()
    .then(() => {
      res.send({
        error: false,
        message: $("success.added"),
      });
    })
    .catch((err) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

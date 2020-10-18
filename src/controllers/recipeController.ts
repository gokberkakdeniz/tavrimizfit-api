import { Response, Request } from "express";
import Recipe, { IRecipe } from "../models/Recipe";

export const getRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const recipe = await Recipe.find();
  res.send(recipe);
};

export const addRecipe = (req: Request, res: Response): void => {
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
        message: "Tarif başarıyla oluşturuldu.",
      });
    })
    .catch((err) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

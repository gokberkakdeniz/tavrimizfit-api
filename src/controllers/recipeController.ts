import { Response, Request } from "express";
import Recipe, { IRecipe } from "../models/Recipe";

// eslint-disable-next-line import/prefer-default-export
export const getRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const k = await Recipe.find();
  res.send(k);
};

export const addRecipe = (req: Request, res: Response): void => {
  const { title, tags, description, ingredients, calori } = req.body;
  const recipe: IRecipe = new Recipe({
    title,
    tags,
    description,
    ingredients,
    calori,
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

import { Document, model, Schema } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  tags: string[];
  description: string;
  ingredients: string[];
  calori: string;
}

const recipeSchema = new Schema<IRecipe>({
  title: {
    type: String,
    maxlength: [30, "Tarif ismi 30 karakterden uzun olmamalı."],
    required: [true, "Lütfen adınızı giriniz."],
  },
  tags: {
    type: [String],
  },
  description: {
    type: String,
    maxlength: [30, "Tarifiniz 30 karakterden uzun olmamalı."],
    required: [true, "Lütfen tarif giriniz."],
  },
  ingredients: {
    type: [String],
  },
  calori: {
    type: String,
  },
});

const recipeModel = model<IRecipe>("Recipe", recipeSchema);

export default recipeModel;

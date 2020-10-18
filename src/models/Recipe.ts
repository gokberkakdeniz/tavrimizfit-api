import { Document, model, Schema } from "mongoose";
import $ from "../messages";

export interface IRecipe extends Document {
  title: string;
  tags?: string[];
  description: string;
  ingredients: string[];
  calorie?: string;
}

const recipeSchema = new Schema<IRecipe>({
  title: {
    type: String,
    required: [true, $("validations.required", { name: "başlığı" })],
  },
  tags: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: [true, $("validations.required", { name: "tarifi" })],
  },
  ingredients: {
    type: [String],
    required: [true, $("validations.required", { name: "malzemeleri" })],
  },
  calorie: {
    type: String,
  },
});

const recipeModel = model<IRecipe>("Recipe", recipeSchema);

export default recipeModel;

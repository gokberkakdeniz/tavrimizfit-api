import { Document, model, Schema } from "mongoose";
import { UserRole } from "./User";
import $ from "../messages";

export interface ITutorial extends Document {
  title: string;
  description: string;
  media?: string[];
  tags?: string[];
  type: UserRole;
}

const tutorialSchema = new Schema<ITutorial>({
  title: {
    type: String,
    required: [true, $("validations.required", { name: "başlık" })],
  },
  description: {
    type: String,
    required: [true, $("validations.required", { name: "tarif" })],
  },
  tags: {
    type: [String],
    default: [],
  },
  media: {
    type: [String],
    default: [],
  },
});

const tutorialModel = model<ITutorial>("Tutorial", tutorialSchema);

export default tutorialModel;

import { Document, model, Schema } from "mongoose";
import { UserRole } from "./User";
import $ from "../messages";

export interface ITraining extends Document {
  title: string;
  description: string;
  media?: string[];
  tags?: string[];
  type: UserRole;
}

const trainingSchema = new Schema<ITraining>({
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

const trainingModel = model<ITraining>("Training", trainingSchema);

export default trainingModel;

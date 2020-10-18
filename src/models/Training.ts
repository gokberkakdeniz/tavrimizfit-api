import { Document, model, Schema, Types } from "mongoose";
import { UserRole } from "./User";
import $ from "../messages";

export interface ITraining extends Document {
  title: string;
  description: string;
  tutorials: Types.ObjectId[];
  tags?: string[];
  type: UserRole;
}

const TrainingSchema = new Schema<ITraining>({
  title: {
    type: String,
    required: [true, $("validations.required", { name: "başlık" })],
  },
  description: {
    type: String,
    required: [true, $("validations.required", { name: "açıklama" })],
  },
  tutorials: {
    type: [Types.ObjectId],
    required: [true, $("validations.required", { name: "hareket" })],
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

const trainingModel = model<ITraining>("Training", TrainingSchema);

export default trainingModel;

import { Document, model, Schema } from "mongoose";
import { UserRole } from "./User";

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
    maxlength: [30, "Başlık 100 karakterden uzun olmamalı."],
    required: [true, "Lütfen başlığı giriniz."],
  },
  description: {
    type: String,
    required: [true, "Lütfen tarif giriniz."],
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

import { Document } from "mongoose";
import { UserRole } from "./User";

export interface Training extends Document {
  title: string;
  text: string;
  video: string;
  type: UserRole;
}

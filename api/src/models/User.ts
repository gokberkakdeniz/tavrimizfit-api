import { Document, model, Schema } from "mongoose";

const userRole = ["normal", "premium"] as const;
export type UserRole = typeof userRole[number];

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  type: UserRole;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: userRole,
    default: userRole[0],
  },
});

export default model<IUser>("User", userSchema);

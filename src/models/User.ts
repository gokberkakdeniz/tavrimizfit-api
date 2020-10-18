import { Document, model, Schema } from "mongoose";
import { validate as isEmail } from "email-validator";
import bcrypt from "bcrypt";
import $ from "../messages";

const userRole = ["normal", "premium"] as const;
export type UserRole = typeof userRole[number];

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  type: UserRole;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    maxlength: [
      30,
      $("validations.max_length", { length: 30, name: "İsminiz" }),
    ],
    required: [true, $("validations.required", { name: "isminizi" })],
  },
  surname: {
    type: String,
    maxlength: [
      30,
      $("validations.max_length", { length: 30, name: "Soyadınız" }),
    ],
    required: [true, $("validations.required", { name: "soyadınızı" })],
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: [true, $("validations.required", { name: "email adresinizi" })],
    validate: {
      validator: isEmail,
      message: $("validations.required", {
        name: "geçerli Eposta adresi",
      }),
      isAsync: false,
    },
  },
  password: {
    type: String,
    minlength: [
      8,
      $("validations.min_length", { length: 8, name: "Şifreniz" }),
    ],
    maxlength: [
      30,
      $("validations.max_length", { length: 30, name: "Şifreniz" }),
    ],
    required: [true, $("validations.required", { name: "şifrenizi" })],
  },
  type: {
    type: String,
    enum: userRole,
    default: userRole[0],
  },
});

// eslint-disable-next-line func-names
userSchema.pre("save", function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    next();
  } else {
    bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
});

const userModel = model<IUser>("User", userSchema);

userSchema
  .path("email")
  .validate(
    (email: string) =>
      userModel.countDocuments({ email }).then((count) => count === 0),
    $("validations.must_be_unique", { name: "eposta adresi" })
  );

export default userModel;

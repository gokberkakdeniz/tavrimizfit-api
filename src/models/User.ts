import { Document, model, Schema } from "mongoose";
import { validate as isEmail } from "email-validator";
import bcrypt from "bcrypt";

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
    minlength: [3, "Kullanıcı adınız 3 karakterden kısa olmamalı."],
    maxlength: [20, "Kullanıcı adınız 20 karakterden uzun olmamalı."],
    required: [true, "Lütfen kullanıcı adınızı giriniz."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Lütfen eposta adresinizi giriniz."],
    validate: {
      validator: isEmail,
      message: "Lütfen geçerli eposta adresi giriniz.",
      isAsync: false,
    },
  },
  password: {
    type: String,
    minlength: [8, "Şifreniz 8 karakterden kısa olmamalı."],
    maxlength: [30, "Şifreniz 30 karakterden uzun olmamalı."],
    required: [true, "Lütfen şifrenizi giriniz."],
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
  .path("username")
  .validate(
    (username: string) =>
      userModel.countDocuments({ username }).then((count) => count === 0),
    "Bu kullanıcı adı kullanılmaktadır."
  );

userSchema
  .path("email")
  .validate(
    (email: string) =>
      userModel.countDocuments({ email }).then((count) => count === 0),
    "Bu eposta adresi kullanılmaktadır."
  );

export default userModel;

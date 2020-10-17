import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const generateToken = (
  email: string,
  name: string,
  password: string,
  type: string
): string => {
  const data = {
    email,
    name,
    password,
    type,
  };
  const token = jwt.sign(data, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
  return token;
};

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.send({
        error: true,
        message: "Email veya şifre geçersiz.",
      });
    } else {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = generateToken(email, password, user.name, user.type);
            res.send({
              error: false,
              message: null,
              token,
            });
          } else {
            res.send({
              error: true,
              message: "Email veya şifre geçersiz.",
            });
          }
        })
        .catch((berr) => {
          console.log(berr);
          res.send({
            error: true,
            message: "bir hata oluştu",
          });
        });
    }
  });
};

export const register = (req: Request, res: Response): void => {
  const { name, password, email } = req.body;
  const user: IUser = new User({
    name,
    password,
    email,
    type: "normal",
  });

  user
    .save()
    .then(() => {
      res.send({
        error: false,
        message:
          "Hesabınız başarıyla oluşturuldu. Hesabınızı aktif hale getirmek için lütfen mail adresinizi kontrol ediniz.",
      });
    })
    .catch((err) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

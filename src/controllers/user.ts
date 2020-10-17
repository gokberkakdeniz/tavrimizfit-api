import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const generateToken = (
  username: string,
  password: string,
  type: string
): string => {
  const data = {
    username,
    password,
    type,
  };
  const token = jwt.sign(data, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
  return token;
};

export const login = (req: Request, res: Response): void => {
  const { username, password, type } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.send({
        error: true,
        message: "Kullanıcı adı veya şifre geçersiz.",
      });
    } else {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = generateToken(username, password, type);
            res.send({
              error: false,
              message: null,
              token,
            });
          } else {
            res.send({
              error: true,
              message: "Kullanıcı adı veya şifre geçersiz.",
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
  const { username, password, email } = req.body;
  const user: IUser = new User({
    username,
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

export const checkToken = (
  req: Request,
  res: Response,
  next: () => void
): Response => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token != null) return res.sendStatus(403);
  next();
  return res;
};

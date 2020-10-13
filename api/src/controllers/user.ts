import { Response, Request } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

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
            res.send({
              error: false,
              message: null,
              token: null,
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

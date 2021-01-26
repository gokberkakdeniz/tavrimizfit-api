import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser, UserRole } from "../models/User";
import $ from "../messages";

export interface ITokenPayload {
  email: string;
  name: string;
  surname: string;
  type: UserRole;
}

const generateToken = (
  email: string,
  name: string,
  surname: string,
  type: UserRole
): string => {
  const data: ITokenPayload = {
    email,
    name,
    surname,
    type,
  };
  const token = jwt.sign(data, process.env.TOKEN_SECRET, {
    expiresIn: "1800h",
  });
  return token;
};

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  if (email === undefined || password === undefined) {
    res.send({
      error: true,
      message: $("validations.required", { name: "eposta ve şifre" }),
    });
  } else {
    User.findOne({ email })
      .then((user: IUser) => {
        if (!user) {
          res.send({
            error: true,
            message: $("validations.invalid_email_or_name"),
          });
        } else {
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              if (result) {
                const { name, surname, type } = user;
                const token = generateToken(email, name, surname, type);
                res.send({
                  error: false,
                  token,
                });
              } else {
                res.send({
                  error: true,
                  message: $("validations.invalid_email_or_name"),
                });
              }
            })
            .catch(() => {
              res.send({
                error: true,
                message: $("errors.unexpected"),
              });
            });
        }
      })
      .catch(() => {
        res.send({
          error: true,
          message: $("errors.unexpected"),
        });
      });
  }
};

export const register = (req: Request, res: Response): void => {
  const { name, surname, password, email } = req.body;
  const user: IUser = new User({
    name,
    surname,
    password,
    email,
    type: "normal",
  });

  user
    .save()
    .then(() => {
      res.send({
        error: false,
        message: $("success.added"),
      });
    })
    .catch((err) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

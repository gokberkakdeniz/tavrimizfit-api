/* eslint-disable consistent-return */
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../controllers/authController";
import User, { IUser, UserRole } from "../models/User";

export type Permission = UserRole | "anonymous";

const ACCESS_DENIED_MESSAGE = {
  error: true,
  message: "Erişim reddedildi.",
};

const permit = (...roles: Permission[]) => (
  req: Request,
  res: Response,
  next: () => void
): unknown => {
  const { authorization } = req.headers;
  if (roles.includes("anonymous") && !authorization) {
    return next();
  }
  const isValidHeader = authorization?.startsWith("Bearer ") ?? false;

  if (isValidHeader) {
    const token = authorization.substring(7);
    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: Error, payload: ITokenPayload): unknown => {
        if (err) {
          return res.status(403).send(ACCESS_DENIED_MESSAGE);
        }

        const { type, email } = payload;

        if (!roles.includes(type)) {
          return res.status(403).send(ACCESS_DENIED_MESSAGE);
        }

        User.findOne({ email })
          .then((user: IUser) => {
            req.user = user;
            next();
          })
          .catch(() => {
            res.status(500).send({
              error: true,
              message: "Bir hata meydana geldi.",
            });
          });
      }
    );
  } else {
    return res.status(403).send(ACCESS_DENIED_MESSAGE);
  }
};

export default permit;

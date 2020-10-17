import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, UserRole } from "../models/User";

export type Permission = UserRole | "anonymous";

const ACCESS_DENIED_MESSAGE = {
  error: true,
  message: "Erişim reddedildi.",
};

const permit = (...roles: Permission[]) => (
  req: Request,
  res: Response,
  next: () => void
  // eslint-disable-next-line consistent-return
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
      (err: Error, user: IUser): unknown => {
        if (err || roles.includes(user.type)) {
          return res.status(403).send(ACCESS_DENIED_MESSAGE);
        }

        return next();
      }
    );
  } else {
    return res.status(403).send(ACCESS_DENIED_MESSAGE);
  }
};

export default permit;

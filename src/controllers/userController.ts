import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// eslint-disable-next-line import/prefer-default-export
export const changeName = (req: Request, res: Response): void => {
  // const { name,  } = req.body;
  const { authorization } = req.headers;
  const token = authorization.substring[7];
  // console.log(token); burda token alamıyorum kardeşim

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: Error, user: IUser): void => {
      console.log(user);
      res.send();
    }
  );
};

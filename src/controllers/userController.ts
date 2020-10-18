import { Response, Request } from "express";
import { extract } from "../helpers";
import $ from "../messages";

// eslint-disable-next-line import/prefer-default-export
export const update = (req: Request, res: Response): void => {
  const body = extract(req.body, "name", "surname", "password");

  req.user
    .updateOne(body)
    .then(() => {
      res.send({
        error: false,
        message: $("success.updated"),
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

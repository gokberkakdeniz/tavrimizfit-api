import { Response, Request } from "express";
import $ from "../messages";

// eslint-disable-next-line import/prefer-default-export
export const updateDetails = (req: Request, res: Response): void => {
  const { name, surname } = req.body;
  req.user
    .updateOne({ name, surname })
    .then(() => {
      res.send({
        error: false,
        message: $("success.updated"),
      });
    })
    .catch(() => {
      res.send({
        error: true,
        message: $("errors.unexpected"),
      });
    });
};

import { Response, Request } from "express";
import Tutorial, { ITutorial } from "../models/Tutorial";
import $ from "../messages";
import { extract } from "../helpers";

export const read = (req: Request, res: Response): void => {
  Tutorial.findById({ _id: req.params.id })
    .then((tutorial) => {
      res.send({
        error: false,
        data: tutorial,
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

export const readAll = async (req: Request, res: Response): Promise<void> => {
  Tutorial.find()
    .then((tutorials) => {
      res.send({
        error: false,
        data: tutorials,
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

export const remove = (req: Request, res: Response): void => {
  Tutorial.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({
        error: false,
        message: $("success.removed"),
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        message: err.message,
      });
    });
};

export const update = (req: Request, res: Response): void => {
  const body = extract(
    req.body,
    "type",
    "tags",
    "media",
    "title",
    "description"
  );

  Tutorial.updateOne({ _id: req.params.id }, body)
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

export const create = (req: Request, res: Response): void => {
  const { title, description, media, tags, type } = req.body;
  const tutorial: ITutorial = new Tutorial({
    title,
    description,
    media,
    tags,
    type,
  });

  tutorial
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

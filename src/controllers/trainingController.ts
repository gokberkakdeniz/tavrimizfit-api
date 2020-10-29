import { Response, Request } from "express";
import Training, { ITraining } from "../models/Training";
import { extract } from "../helpers";
import $ from "../messages";

export const read = (req: Request, res: Response): void => {
  Training.findById(req.params.id)
    .populate({
      path: "tutorials",
      populate: {
        path: "tutorials",
      },
    })
    .then((training) => {
      res.send({
        error: false,
        data: training,
      });
    })
    .catch((err: Error) => {
      res.send({
        error: true,
        data: err.message,
      });
    });
};

export const readAll = async (req: Request, res: Response): Promise<void> => {
  Training.find()
    .populate({
      path: "tutorials",
      populate: {
        path: "tutorials",
      },
    })
    .then((trainings) => {
      res.send({
        error: false,
        data: trainings,
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
  Training.findByIdAndDelete(req.params.id)
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
    "title",
    "description",
    "tutorials",
    "tags",
    "type"
  );

  Training.updateOne({ _id: req.params.id }, body)
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
  const { title, description, tutorials, tags, type } = req.body;
  const training: ITraining = new Training({
    title,
    description,
    tutorials,
    tags,
    type,
  });

  training
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

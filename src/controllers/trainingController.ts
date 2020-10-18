import { Response, Request } from "express";
import Training, { ITraining } from "../models/Training";
import Tutorial from "../models/Tutorial";
import $ from "../messages";
import { extract } from "../helpers";

export const read = (req: Request, res: Response): void => {
  Training.findById({ _id: req.params.id })
    .then((training) => {
      Tutorial.find({ _id: { $in: training.tutorials } })
        .then((tutorials) => {
          res.send({
            error: false,
            data: { ...training.toObject(), tutorials },
          });
        })
        .catch((err: Error) => {
          res.send({
            error: true,
            data: err.message,
          });
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

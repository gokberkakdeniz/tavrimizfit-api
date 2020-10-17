import { Response, Request } from "express";

// eslint-disable-next-line import/prefer-default-export
export const updateDetails = (req: Request, res: Response): void => {
  const { name, surname } = req.body;
  req.user
    .updateOne({ name, surname })
    .then(() => {
      res.send({
        error: false,
        message: "Adınız ve soyadınız başarıyla güncellendi.",
      });
    })
    .catch(() => {
      res.send({
        error: true,
        message: "Beklenmeyen bir hata oluştu...",
      });
    });
};

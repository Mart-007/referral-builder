import httpStatus from "http-status";
import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND);
  res.json({
    success: false,
    message: "Requested Resource Not Found",
  });
  res.end();
};

export const internalServerError = (err, req: Request, res: Response) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    message: err.message,
    extra: err.extra,
    errors: err,
  });
  res.end();
};

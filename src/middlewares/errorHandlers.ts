import { Request, Response, NextFunction } from "express";
import yup, { AnySchema } from "yup";
import { schemaTodoPost } from "../validation/schemaTodoValidation";

interface AppError extends Error {
  status?: number;
}

export const errorHandlers = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};

export const validateRequestSchema =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      }); // stripUnknown: true to remove extra fields
      next();
    } catch (error) {
      if (error instanceof Error && "errors" in error) {
        res.status(400).json({ errors: (error as yup.ValidationError).errors });
      } else {
        res.status(500).json({ error: "Validation failed" });
      }
    }
  };

export const validateParamsSchema = (schema: yup.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate(req.params)
      .then(() => next())
      .catch((err) => res.status(400).json({ error: err.errors }));
  };
};

export const validateQuerySchema = (schema: yup.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate(req.query)
      .then(() => next())
      .catch((err) => res.status(400).json({ error: err.errors }));
  };
};

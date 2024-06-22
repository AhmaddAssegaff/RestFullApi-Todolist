import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export const schemaTodoPost = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .max(255, "Title must be at most 255 characters"),
  description: yup.string().optional().default("Add description if necessary."),
  completed: yup.boolean().default(false),
});

export const schemaTodoPut = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
});

export const getTodosSchema = yup.object({
  sortBy: yup.string().oneOf(["createdAt", "updatedAt"]).optional(),
  limit: yup.number().integer().positive().optional(),
  skip: yup.number().integer().min(0).optional(),
});

export const getTodoByIdSchema = yup.object({
  id: yup
    .number()
    .integer("ID must be an integer")
    .positive("ID must be a positive integer"),
});

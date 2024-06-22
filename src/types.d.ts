import { Request } from "express";

export type Todo = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
};

export type OrderByType = "createdAt" | "updatedAt";

declare module "express-serve-static-core" {
  interface Request {
    query: {
      orderBy?: OrderByType;
      skip?: number;
      take?: number;
    };
  }
}

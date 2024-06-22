import { Request } from "express";
declare module "express-serve-static-core" {
  interface Request {
    query: {
      orderBy?: OrderByType;
      skip?: number;
      take?: number;
    };
  }
}

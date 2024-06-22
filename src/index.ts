// src/index.ts
import Express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();
const app = Express();
const PORT: string = process.env.PORT!;

app.use(Express.json());
app.use("/API", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});

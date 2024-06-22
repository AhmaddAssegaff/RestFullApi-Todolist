import { Router } from "express";
import * as todoController from "../controller/todoController";
import {
  validateRequestSchema,
  validateParamsSchema,
  validateQuerySchema,
} from "../middlewares/errorHandlers";
import {
  schemaTodoPost,
  schemaTodoPut,
  getTodoByIdSchema,
  getTodosSchema,
} from "../validation/schemaTodoValidation";

const router: Router = Router();

router.get("/todos", todoController.getAllTodo);
// router.get(
//   "/todos/order",
//   validateQuerySchema(getTodosSchema),
//   todoController.getAllByOrder
// );
router.get(
  "/todos/:id",
  validateParamsSchema(getTodoByIdSchema),
  todoController.getTodoById
);
router.get("/todos/:id", todoController.getTodoById);
router.post(
  "/todos",
  validateRequestSchema(schemaTodoPost),
  todoController.postTodo
);
router.put(
  "/todos/:id",
  validateRequestSchema(schemaTodoPut),
  todoController.putTodo
);

export default router;

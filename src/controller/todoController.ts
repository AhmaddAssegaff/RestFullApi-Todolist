import { Todo } from "../types/types";
import * as todoService from "../services/todoService";
import { Request, Response } from "express";

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const getAllTodo = await todoService.getAllTodos();
    res.status(200).json(getAllTodo);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const todos = await todoService.getTodoById(id);

    if (!todos) {
      return res
        .status(404)
        .json({ error: "err: getTodoById, Todo not found" });
    }

    res.status(200).json(todos);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const postTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = await todoService.postTodo(req.body);
    res.status(201).json(newTodo);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const putTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existingTodo: Todo | null = await todoService.getTodoById(id);

    if (!existingTodo) {
      return res.status(404).json({ error: "err: putTodo, Todo not found" });
    }

    const fieldsToCheck: (keyof Todo)[] = ["title", "description", "completed"];
    const isDifferent = fieldsToCheck.some(
      (key) =>
        req.body[key] !== undefined && req.body[key] !== existingTodo[key]
    );

    if (!isDifferent) {
      return res.status(400).json({ error: "No changes detected" });
    }

    const updatedTodo = await todoService.putTodo(id, req.body);
    res.status(200).json(updatedTodo);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

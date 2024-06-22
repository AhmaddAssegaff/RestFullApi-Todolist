import * as todoModel from "../models/todoModel";
import { OrderByType, Todo, defaultSkip, defaultTake } from "../types/types";

export const getAllTodos = async () => {
  return await todoModel.getAllTodo();
};
export const getTodoById = async (id: number) => {
  return await todoModel.getTodoById(id);
};

export const postTodo = async (todoData: Todo) => {
  return await todoModel.postTodo(todoData);
};

export const putTodo = async (id: number, todoData: Partial<Todo>) => {
  return await todoModel.putTodo(id, todoData);
};

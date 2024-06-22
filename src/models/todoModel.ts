import prisma from "../db/prismaClients";
import { OrderByType, Todo, defaultSkip, defaultTake } from "../types/types";

export const getAllTodo = async () => {
  return await prisma.todo.findMany();
};

export const getTodoById = async (id: number) => {
  return await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
};

export const postTodo = async (todoData: Todo) => {
  return await prisma.todo.create({
    data: todoData,
  });
};

export const putTodo = async (id: number, todoData: Partial<Todo>) => {
  return await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      ...todoData,
      updatedAt: new Date(),
    },
  });
};

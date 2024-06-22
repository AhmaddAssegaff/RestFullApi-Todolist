export const defaultSkip: number = 0;
export const defaultTake: number = 10;
export type OrderByType = "createdAt" | "updatedAt";
export type Todo = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
};

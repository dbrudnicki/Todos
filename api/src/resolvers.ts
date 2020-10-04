import { v4 } from "uuid";
import { ApolloError } from "apollo-server";

/**
 * TodoType represents the structure of a Todo.
 */
interface TodoType {
  id: string;
  title?: string;
  completed?: boolean;
}

let todos: Array<TodoType> = [];

/**
 * This function is used to find a Todo based on
 * it's id. If none is found an ApolloError will be thrown.
 *
 * @param id
 */
const findTodo = (id: string): TodoType => {
  let todo: TodoType | undefined = todos.find((t: TodoType) => t.id === id);

  if (todo === undefined) {
    throw new ApolloError(`Todo with id: ${id}, not found.`, "404");
  }

  return todo;
};

export default {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo(node: TodoType, { title }: { title: string }) {
      const todo: TodoType = {
        id: v4(),
        title,
        completed: false,
      };

      todos.push(todo);

      return todo;
    },
    removeTodo(node: TodoType, { id }: { id: string }) {
      const todo: TodoType = findTodo(id);
      todos = todos.filter((t: TodoType) => t.id !== id);
      return todo;
    },
    updateTodo(
      node: TodoType,
      { params: { id, title, completed } }: { params: TodoType }
    ) {
      let todo: TodoType = findTodo(id);

      if (title) todo.title = title;
      if (completed) todo.completed = completed;

      return todo;
    },
  },
};

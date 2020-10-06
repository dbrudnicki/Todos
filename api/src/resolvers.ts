import { v4 } from 'uuid'
import { ApolloError } from 'apollo-server'

/**
 * TodoType represents the structure of a Todo.
 */
interface TodoType {
  id: string
  title?: string
  completed?: boolean
}

let todos: Array<TodoType> = []

/**
 * This function is used to find a Todo based on
 * it's id. If none is found an ApolloError will be thrown.
 *
 * @param id
 */
const findTodo = (id: string): TodoType => {
  const todo: TodoType | undefined = todos.find((t: TodoType) => t.id === id)

  if (todo === undefined) {
    throw new ApolloError(`Todo with id: ${id}, not found.`, '404')
  }

  return todo
}

export default {
  Query: {
    todos: (): Array<TodoType> => todos
  },
  Mutation: {
    addTodo(node: TodoType, { title }: { title: string }): TodoType {
      const todo: TodoType = {
        id: v4(),
        title,
        completed: false
      }

      todos.push(todo)

      return todo
    },
    removeTodo(node: TodoType, { id }: { id: string }): TodoType {
      const todo: TodoType = findTodo(id)
      todos = todos.filter((t: TodoType) => t.id !== id)
      return todo
    },
    updateTodo(node: TodoType, { params: { id, completed } }: { params: TodoType }): TodoType {
      const todo: TodoType = findTodo(id)

      todo.completed = completed

      return todo
    }
  }
}

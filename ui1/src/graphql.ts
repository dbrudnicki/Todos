import { gql } from '@apollo/client'

const fragment = `
    id
    title
    completed
`

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      ${fragment}
    }
  }
`

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      ${fragment}
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean) {
    updateTodo(params: { id: $id, completed: $completed }) {
      ${fragment}
    }
  }
`

export const REMOVE_TODO = gql`
mutation RemoveTodo($id: ID!) {
  removeTodo(id: $id) {
    ${fragment}
  }
}
`

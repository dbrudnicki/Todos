import React from 'react'
import { GET_TODOS } from './graphql'
import { useQuery } from '@apollo/client'
import { ListGroup, ListGroupItem, Alert } from 'reactstrap'

interface TodoType {
  id: string
  title: string
  completed: boolean
}

// The App Component
export const App = () => {
  const { loading, error, data } = useQuery(GET_TODOS)

  if (error) {
    console.log(error)
    return <Alert color="danger">An error occurred; check the console for details.</Alert>
  }

  if (loading) return null

  const todos: TodoType[] = data.todos

  const displayList = () => {
    return todos.map((t: TodoType) => (
      <ListGroupItem key={t.id} value={t.id}>
        {t.title}
      </ListGroupItem>
    ))
  }

  return (
    <div className="App">
      <ListGroup>{displayList()}</ListGroup>
    </div>
  )
}

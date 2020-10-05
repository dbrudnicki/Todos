import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { ListGroup, ListGroupItem, Alert } from 'reactstrap'

interface Props {
  message?: string
}

interface TodoType {
  id: string
  title: string
  completed: boolean
}

//#region GraphQL Stuff
const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`
//#endregion

// The App Component
export const App = ({ message = "I'm empty" }: Props) => {
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

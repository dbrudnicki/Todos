import React, { useState } from 'react'
import { GET_TODOS, ADD_TODO } from './graphql'
import { useQuery, useMutation } from '@apollo/client'
import { Input, ListGroup, ListGroupItem, Alert } from 'reactstrap'
import { settings } from 'cluster'

interface TodoType {
  id: string
  title: string
  completed: boolean
}

// The App Component
export const App = () => {
  const [todoItem, setTodoItem] = useState('')

  // Used to run the initial query
  const { loading, error, data } = useQuery(GET_TODOS)

  // Used to add a new todo
  const [addTodo] = useMutation(ADD_TODO, {
    onError(error) {
      console.log(error)
      return <Alert color="danger">An error occurred; check the console for details.</Alert>
    },
    update(cache, { data: { addTodo } }) {
      const data: any = cache.readQuery({ query: GET_TODOS })
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: [...data.todos, addTodo] }
      })
    },
    onCompleted() {
      setTodoItem('')
    }
  })

  if (error) {
    console.log(error)
    return <Alert color="danger">An error occurred; check the console for details.</Alert>
  }

  if (loading) return null

  const todos: TodoType[] = data.todos

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === 'enter') {
      addTodo({ variables: { title: todoItem } })
    }
  }

  const displayList = () => {
    return todos.map((t: TodoType) => (
      <ListGroupItem key={t.id} value={t.id}>
        {t.title}
      </ListGroupItem>
    ))
  }

  return (
    <div className="App">
      <Input
        type="text"
        value={todoItem}
        placeholder="Enter a todo item here"
        autoFocus={true}
        onChange={(e) => setTodoItem(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <ListGroup>{displayList()}</ListGroup>
    </div>
  )
}

import React, { useState } from 'react'
import { GET_TODOS, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from './graphql'
import { ApolloError, useQuery, useMutation } from '@apollo/client'
import { Input, ListGroup, ListGroupItem, Alert } from 'reactstrap'
import { settings } from 'cluster'

interface TodoType {
  id: string
  title: string
  completed: boolean
}

const handleError = (error: ApolloError) => {
  console.log(error)
  return <Alert color="danger">An error occurred; check the console for details.</Alert>
}

// The App Component
export const App = () => {
  // Set the state of the Todo input item
  const [todoItem, setTodoItem] = useState('')

  // Used to run the initial query
  const { loading, error, data } = useQuery(GET_TODOS)

  // Used to add a new Todo
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

  // Used to setthe completed flag on a Todo
  const [updateTodo] = useMutation(UPDATE_TODO, {
    onError(error) {
      return handleError(error)
    }
  })

  // Used to remove a Todo
  const [removeTodo] = useMutation(REMOVE_TODO, {
    onError(error) {
      return handleError(error)
    },
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          todos(existingRefs, { readField }) {
            const result = existingRefs.filter((r) => removeTodo !== readField('id', r))

            cache.evict({ id: cache.identify(removeTodo) })

            return result
          }
        }
      })
    }
  })

  if (error) {
    return handleError(error)
  }

  if (loading) return null

  const todos: TodoType[] = data.todos

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === 'enter') {
      addTodo({ variables: { title: todoItem } })
    }
  }

  const handleItemClick = ({ id, completed }: TodoType) => {
    updateTodo({
      variables: {
        id,
        completed: !completed
      }
    })
  }

  const handleRemoveItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    removeTodo({ variables: { id } })
  }

  const displayList = () => {
    return todos.map((t: TodoType) => (
      <ListGroupItem
        className={t.completed ? 'completed' : ''}
        key={t.id}
        value={t.id}
        onClick={() => handleItemClick(t)}>
        {t.title}{' '}
        <span className="trash" title="Remove Todo Item" onClick={(e) => handleRemoveItem(e, t.id)}>
          X
        </span>
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

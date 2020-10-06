import React from 'react'
import { Jumbotron } from 'reactstrap'

interface PropType {
  message?: string
}

export const App: React.FC<PropType> = ({ message = "I'm empty" }) => (
  <Jumbotron className="App">
    <h1>{message}</h1>
  </Jumbotron>
)

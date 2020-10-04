import React from "react";
import { Jumbotron } from "reactstrap";

interface Props {
  message?: string;
}

export const App = ({ message = "I'm empty" }: Props) => (
  <Jumbotron className="App">
    <h1>{message}</h1>
  </Jumbotron>
);

import { useState, useEffect } from "react";

import InputForm from "./InputForm";
import Todo from "./Todo";

const TaskList = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );

  // on any change in todos update in the local Storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  // add a new todo
  const addTodo = (todo) => {
    // if does not contain any text don't want to add that
    if (!todo.text) {
      return;
    }

    // add it along the old todos
    // adding it first since recent tasks need to be at top
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  // complete todo
  const completeTodo = (id) => {
    // this will run on onClick
    // if already completed need to give ability to mark it as false as well
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    // also need to sort the todos so that completed todos are later in the list

    const completeTodos = todos.filter((todo) => {
      if (todo.isComplete) {
        return todo;
      }
      return false;
    });

    const inCompleteTodos = todos.filter((todo) => {
      if (!todo.isComplete) {
        return todo;
      }
      return false;
    });

    updatedTodos = [...inCompleteTodos, ...completeTodos];

    setTodos(updatedTodos);
  };

  // remove todo with given id
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  // update todo with id and given value
  const updateTodo = (id, value) => {
    if (!value.text) {
      return;
    }

    // map over the prev todos find one which has the current id and then update its value and return the new udpatedTodos

    const updatedTodos = todos.map((todo) => (todo.id === id ? value : todo));

    setTodos(updatedTodos);
  };

  return (
    <div>
      <div className="heading-container">
        <div>
          <h1>Todo List !</h1>
        </div>
        <div>
          <button
            className="reset-icon"
            onClick={() => {
              setTodos([]);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <InputForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TaskList;

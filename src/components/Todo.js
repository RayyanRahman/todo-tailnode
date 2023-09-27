import { useState } from "react";

import TodoForm from "./InputForm";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  // if edit gets updated only then pass the edit prop to the todoform
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={todo.id}
    >
      <div className="todo-text" onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <button onClick={() => removeTodo(todo.id)} className="delete-icon">
          Delete
        </button>
        <button
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        >
          {" "}
          Edit
        </button>
      </div>
    </div>
  ));
};

export default Todo;

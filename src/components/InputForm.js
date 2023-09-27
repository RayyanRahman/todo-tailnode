import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const InputForm = ({ onSubmit, edit }) => {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: uuidv4(),
      text: input,
      isComplete: false,
    });

    // for the new task to be added
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {edit ? (
        <>
          <input
            placeholder="Update your task"
            value={input}
            onChange={handleChange}
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update Task
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add your tasks to be done !"
            value={input}
            onChange={handleChange}
            ref={inputRef}
            className="todo-input"
          />
          <button onClick={handleSubmit} className="todo-button">
            Add
          </button>
        </>
      )}
    </form>
  );
};

export default InputForm;

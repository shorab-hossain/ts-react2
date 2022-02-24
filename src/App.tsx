import React, { useCallback, useReducer, useRef } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
}


type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);

  // [{}, {}, {}]

  
  const newTodoRef = useRef<HTMLInputElement>(null);
  // {} === {} // false
  // useCallback
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (

    
    <div className="App d-flex justify-content-center align-items-center">
              <div className="mt-5">
              <h4>Write your favorite Name</h4>
              <input className="px-4 py-2 b-0" type="text" ref={newTodoRef} />
          <button onClick={onAddTodo}>Add</button>
          {todos.map((todo) => (
            <div key={todo.id}>
              {todo.text}
              <button className="btn btn-primary py-2" onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
                Remove
              </button>
              </div>
      ))}
    </div>
    </div>
  );
}

export default App;
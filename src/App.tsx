import React, { useState } from "react";
import "./App.css";

type Todo = {
  value: string;
  id: number;
  checked: boolean;
};

const App: React.VFC = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]); //Todo型の配列

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    //no text
    if (!text) return;

    //create new todo
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    };
    setTodos([newTodo, ...todos]); //...は配列やリストの括弧を外してくれる
    setText("");
  };

  const handleOnEdit = (id: number, value: string) => {
    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="追加" onSubmit={(e) => handleOnSubmit(e)} />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={(e) => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;

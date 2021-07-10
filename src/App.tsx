import React, { useState } from "react";
import "./App.css";

type Todo = {
  value: string;
  id: number;
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
                type="text"
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

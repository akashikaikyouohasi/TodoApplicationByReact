import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "./App.css";

type Todo = {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = "all" | "checked" | "unchecked" | "removed"; //Union型

const App: React.VFC = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]); //Todo型の配列
  const [filter, setFilter] = useState<Filter>("all"); //初期値はall

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    //no text
    if (!text) return;

    //create new todo
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
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

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const filteredTodos: Todo[] = todos.filter((todo) => {
    switch (
      filter //trueを返すものだけのリストにしている
    ) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnEmpty = () => {
    const newTodos: Todo[] = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Select
              native
              defaultValue="all"
              onChange={(e) => setFilter(e.target.value as Filter)} //asは型アサーション。変数の型を上書き
            >
              <option value="all">すべてのタスク</option>
              <option value="checked">完了したタスク</option>
              <option value="unchecked">未完了のタスク</option>
              <option value="removed">削除済みのタスク</option>
            </Select>
            {filter === "removed" ? (
              <button
                onClick={() => handleOnEmpty()}
                disabled={todos.filter((todo) => todo.removed).length === 0}
              >
                ゴミ箱を空にする
              </button>
            ) : (
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={text}
                  disabled={filter === "checked"}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={filter === "checked"}
                  onSubmit={(e) => handleOnSubmit(e)}
                >
                  追加
                </Button>
              </form>
            )}
          </Grid>
          <ul>
            {filteredTodos.map((todo) => {
              return (
                <li key={todo.id}>
                  <Checkbox
                    disabled={todo.removed}
                    checked={todo.checked}
                    onChange={(e) => handleOnCheck(todo.id, todo.checked)}
                    color="primary"
                    inputProps={{ "aria-label": "primary  checkbox" }}
                  />
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    disabled={todo.checked || todo.removed}
                    value={todo.value}
                    onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOnRemove(todo.id, todo.removed)}
                  >
                    {todo.removed ? "復元" : "削除"}
                  </Button>
                </li>
              );
            })}
          </ul>
        </Grid>
      </Container>
    </div>
  );
};

export default App;

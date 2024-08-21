import { useSelector, useDispatch } from "react-redux";
import { todoSelector } from "./reducer/todoReducer";
import { useEffect } from "react";
import { getInitialStateAsync } from "./reducer/todoReducer";
import TodoInput from "./components/todoinput";
import TodoList from "./components/todolist";

function App() {
  const todos = useSelector(todoSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInitialStateAsync())
  }, [])

  return (
    <div className="col-6 d-flex py-3 flex-column m-auto rounded">
      <TodoInput />
      <div className="col-6 border border-dark m-auto"></div>
      <div className="todolist">
        {todos.map((todo, id) => {
          return (
            <TodoList key={id} todo={todo} todo_id={id} />
          )
        })}
      </div>
    </div>

  );
}

export default App;

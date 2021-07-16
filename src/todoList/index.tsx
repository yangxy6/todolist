import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  //   useState,
} from "react";
import { todoReducer } from "../reducer";
import { ACTION_TYPE, IState, ITodo } from "../typings";
import Input from "./Input";
import List from "./List";

// const initialState: IState = {
//   todoList: [],
// };

// 惰性初始化
function init(initTodoList: ITodo[]): IState {
  return {
    todoList: initTodoList,
  };
}

const TodoList: FC = (): ReactElement => {
  // 使用useReducer 比useState 更方便
  // const [todoList, setTodoList] = useState<ITodo[]>([]);

  const [state, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todolist") || "[]");
    dispatch({
      type: ACTION_TYPE.INIT_TODOLIST,
      payload: todoList,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(state.todoList));
  }, [state.todoList]);

  // useCallback 返回缓存函数
  const addTodo = useCallback((todo: ITodo) => {
    // setTodoList((todoList) => [...todoList, todo]);
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: ACTION_TYPE.REMOVE_TODO,
      payload: id,
    });
  }, []);

  const toggleTodo = useCallback((id: number) => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_TODO,
      payload: id,
    });
  }, []);

  return (
    <div>
      <Input addTodo={addTodo} todoList={state.todoList} />
      <List
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        todoList={state.todoList}
      ></List>
    </div>
  );
};

export default TodoList;

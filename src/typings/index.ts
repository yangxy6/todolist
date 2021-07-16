export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}

export interface IState {
  todoList: ITodo[];
}

export interface IAction {
  type: ACTION_TYPE;
  payload: ITodo | ITodo[] | number; //联合类型
}

export enum ACTION_TYPE {
  ADD_TODO = "add_todo",
  REMOVE_TODO = "remove_todo",
  TOGGLE_TODO = "toggle_todo",
  INIT_TODOLIST = "init_todolist",
}

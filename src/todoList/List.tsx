import React, { FC, ReactElement } from "react";
import { ITodo } from "../typings";
import Item from "./Item";

interface IProps {
  todoList: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const List: FC<IProps> = ({
  todoList,
  removeTodo,
  toggleTodo,
}): ReactElement => {
  return (
    <div>
      {todoList.map((todo: ITodo) => (
        <Item
          key={todo.id}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          todo={todo}
        ></Item>
      ))}
    </div>
  );
};

export default List;

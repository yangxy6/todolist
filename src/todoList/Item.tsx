import React, { FC, ReactElement } from "react";
import { ITodo } from "../typings";

interface IProps {
  todo: ITodo;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const Item: FC<IProps> = ({ todo, removeTodo, toggleTodo }): ReactElement => {
  const { id, content, completed } = todo;
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {content}
      </span>
      <button
        onClick={() => {
          removeTodo(id);
        }}
      >
        删除
      </button>
    </div>
  );
};

export default Item;

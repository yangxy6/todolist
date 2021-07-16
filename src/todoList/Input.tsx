import React, { FC, ReactElement, useRef } from "react";
import { ITodo } from "../typings";

interface IProps {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}

const Input: FC<IProps> = ({ addTodo, todoList }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = (): void => {
    // useRef可以保存实例，保存在inputRef.current中
    // inputRef.current 不会为空 ts会提示null 需要断言inputRef.current!
    const val: string = inputRef.current!.value.trim();

    if (val.length) {
      const isExist = todoList.find((todo) => todo.content === val);

      if (isExist) {
        alert("已存在");
        return;
      }

      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false,
      });
    }
  };
  return (
    <div>
      <input type="text" placeholder="请输入todo项" ref={inputRef} />
      <button onClick={addItem}>确认</button>
    </div>
  );
};

export default Input;

# todoList 实现 vite+hook+ts 版本

## 一、HOOK 学习

钩子，钩入 state 和生命周期等的函数
hook 使用了 js 闭包，将 state 变量放到函数作用域中

1. 特性：

- 100%兼容
- 完全可选，class 组件不会移除

2. 为什么使用 hook：
   - 解决组件之间复用状态，之前使用高阶组件进行状态复用，会在 react tools 中看到组件的嵌套地狱。
   - 复杂组件难以理解，hook 使用更小函数，而非按照生命周期拆分组件
   - class 组件理解，this 特性需要单独学习
3. hook 使用规则
   - 只能在函数最外层调用 hook，不能在循环，判断中调用
   - 只能在 React 组件中调用，或者自定义的 hook 中使用 hook

## 二、HOOK 概览

### 1.useState

1. 在 hook 中使用 state
2. 可以使用多个 state
3. 惰性初始化 state：可以传递一个函数

   ```js
   const [state, setState] = useState(() => {
     const initialState = someExpensiveComputation(props);
     return initialState;
   });
   ```

4. 跳过 state 更新，内部使用 Object.is() 深比较

## 2. useEffect

1. effect（副作用）：例如数据获取，修改 dom 等额外操作称为副作用。useEffect 是操作副作用的函数。
   代替 class 组件生命周期
   - componentDidMount
   - componentDidUpdate
   - componentWillUnMount
2. 副作用是否需要清除

   无需清除 effect: 发送请求，更改 dom 等操作不需要清除 effect

   需要清除 effect：订阅外部信息源，定时器等，需要清除，防止内存泄漏

   清除副作用的时间：组件卸载时

   ```js
   // 清除副作用
   useEffect(() => {
     function handleStatusChange(status) {
       setIsOnline(status.isOnline);
     }
     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
     //return 清除副作用-可选
     return function cleanup() {
       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
     };
   });
   ```

3. useEffect 函数每次渲染中都会返回最新的 effect。为了获取最新的 state。某种意义上说，effect 更像是渲染的结果，每个 effect 属于一次特定的渲染
4. 不是同步更新，不会阻塞浏览器更新。同步 hook-》useLayoutEffect
5. 多个 effect 使用
   - 允许按照代码用途使用多个 effect
   - 依次按照顺序调用 effect
6. effect 返回函数每次都会运行，而不是只在卸载时运行，原因：避免出现 effect bug。它会在调用一个新的 effect 之前对前一个 effect 进行清理。
7. 性能优化：可以选择监听的变量，来优化性能
   ```js
   useEffect(() => {
     function handleStatusChange(status) {
       setIsOnline(status.isOnline);
     }
     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
     return () => {
       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
     };
   }, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅
   ```
8. effect 第二个参数传递[]，代表不依赖于任何值，所以只执行一次

## 3. useContext

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider> `的 `value prop` 决定。

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};
const ThemeContext = React.createContext(themes.light);
function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## 4. useReducer

使用场景：包含很多子组件，需要传递复杂数据（需要 redux 场景），并且会触发性能优化，向子组件传递 dispatch 而不是回掉函数

    ```js
    const initialState = { count: 0 };
    function reducer(state, action) {
      switch (action.type) {
        case "increment":
          return { count: state.count + 1 };
        case "decrement":
          return { count: state.count - 1 };
        default:
          throw new Error();
      }
    }
    function Counter() {
      const [state, dispatch] = useReducer(reducer, initialState);
      return (
        <>
          Count: {state.count}
          <button onClick={() => dispatch({ type: "decrement" })}>-</button>
          <button onClick={() => dispatch({ type: "increment" })}>+</button>
        </>
      );
    }
    const [state, dispatch] = useReducer(reducer, [], init);
    // 惰性初始化
    function init(initTodoList: ITodo[]): IState {
      return {
        todoList: initTodoList,
      };
    }
    ```

## 5. useCallback

返回一个 meoized 类型函数。
当回掉函数传递给经过优化并使用引用相等性避免非必要渲染（useCallback 优化了回掉函数：将回掉函数进行缓存）

    ```js
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

# 二、 开发

1.组件拆分

- APP
  - Input
  - List
    - Item

2. 功能

- todo 添加
- todo 删除
- todo 勾选
- localstorge 数据存储

3. 使用到 hook

- useCallback
- useEffect
- useReducer
- useRef
- useState

4. 文件结构

- reducer 状态管理
- todoList 业务组件
  - index 父组件
    - input 输入组件
    - List 列表组件
      - Item 列表子组件
- typing type 类型

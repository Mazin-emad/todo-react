import TodoList from "./views/TodoList";
import Header from "./components/todos/Header";
import "./assets/css/index.css";

function App() {
  return (
    <div className="App">
      <Header/>
      <TodoList />
    </div>
  );
}

export default App;

import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="app">
     <div className="app-header"> Todo App</div>
      <Todos />
      <DisplayTodos />
    </div>
  );
}

export default App;

import React from 'react';
import TodoList from './components/TodoList';
import Weather from "./components/Weather"
function App() {
  return (
    <div className="App">
      <TodoList />
      <Weather></Weather>
    </div>
  );
}

export default App;
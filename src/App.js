import { BrowserRouter as Router, Routes, Route ,Redirect } from 'react-router-dom';
import TodoList from './docs/TodoList';
import SignUpp from './docs/SignUpp';
import SignInn from './docs/SıgnInn';




function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/todos" element={<TodoList />} />
        <Route path="/" element={<SignUpp/>} />
        <Route path="/signin" element={<SignInn/>} />
      </Routes>
    </Router>
  );
}

export default App;

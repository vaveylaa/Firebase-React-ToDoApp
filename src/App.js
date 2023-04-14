import { BrowserRouter as Router, Routes, Route ,Redirect } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import TodoList from './docs/TodoList';
import Calendar  from './Calendar';
import PersonalPage from './PersonalPage';
import SignUpp from './docs/SignUpp';
import SignInn from './docs/SıgnInn';




function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/signuppp" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/personal" element={<PersonalPage/>} />
        <Route path="/" element={<SignUpp/>} />
        <Route path="/signin" element={<SignInn/>} />

      </Routes>
    </Router>
  );
}

export default App;

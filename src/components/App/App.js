import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import SignUp from '../Authentication/Signup/Signup';

function App() {
  return (
    <div className="wrapper">
      <h1>Avalon</h1>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

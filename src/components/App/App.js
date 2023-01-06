import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import SignUp from '../Authentication/Signup/Signup';
import Login from '../Authentication/Login/Login';
import Logout from '../Authentication/Logout/Logout';



function App() {
  const [token, setToken] = React.useState();
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <h1>Avalon</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </Router>
      <Logout setToken={setToken}></Logout>
    </div>
  );
}

export default App;

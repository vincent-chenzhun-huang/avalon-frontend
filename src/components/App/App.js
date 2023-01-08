import './App.css';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Login from '../Authentication/Login/Login';
import Logout from '../Authentication/Logout/Logout';
import GameCreation from '../Game/GameCreation/GameCreation';
import EnterGame from '../Game/EnterGame/EnterGame';
import GameInfo from '../Game/GameInfo/GameInfo';

function App() {
  const [token, setToken] = React.useState();
  if (!token) {
    return (
      <Router>
        <div className="auth-wrapper">
        </div>
        <Routes>
          <Route path='/' element={<Login setToken={setToken}/>}/>
        </Routes>
      </Router>

    );
  }
  return (
    <div className="wrapper">
      <Router>
        <h1>Avalon</h1>
        <li><Link to="/create">Create a New Game</Link></li>
        <li><Link to="/enter">Enter a Game</Link></li>
        <Routes>
          <Route path='/login' element={<Login setToken={setToken}/>}/>
          <Route path="/create" element={<GameCreation token={token}/>}/>
          <Route path="/enter" element={<EnterGame token={token}/>}/>
          <Route path="/game/:gameId" element={<GameInfo token={token}/>}/>
        </Routes>
      </Router>
      <Logout setToken={setToken}></Logout>
    </div>
  );
}

export default App;

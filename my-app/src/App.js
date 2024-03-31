import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import LobbyScreen from './screens/lobby';
import RoomPage from './screens/Room';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LobbyScreen/>}/>
        <Route path='/room/:roomid' element={<RoomPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

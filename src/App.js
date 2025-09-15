import React, { useState } from 'react';
import JoinRoom from './components/JoinRoom';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('join');
  const [roomData, setRoomData] = useState({
    roomId: '',
    userName: '',
    userId: ''
  });

  const handleJoinRoom = (roomId, userName) => {
    setRoomData({
      roomId,
      userName,
      userId: Math.random().toString(36).substr(2, 9)
    });
    setCurrentView('chat');
  };

  const handleLeaveRoom = () => {
    setCurrentView('join');
    setRoomData({ roomId: '', userName: '', userId: '' });
  };

  return (
    <div className="App">
      {currentView === 'join' ? (
        <JoinRoom onJoinRoom={handleJoinRoom} />
      ) : (
        <ChatRoom 
          roomData={roomData}
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </div>
  );
}

export default App;

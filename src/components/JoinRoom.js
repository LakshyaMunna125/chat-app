import React, { useState } from 'react';
import ApiService from '../services/api';
import './JoinRoom.css';

const JoinRoom = ({ onJoinRoom }) => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (userName.trim() && roomId.trim()) {
      setLoading(true);
      setError('');
      
      try {
        const response = await ApiService.joinRoom(roomId.trim(), userName.trim());
        console.log('Joined room successfully:', response);
        onJoinRoom(roomId.trim(), userName.trim());
      } catch (error) {
        console.error('Error joining room:', error);
        if (error.message.includes('404') || error.message.includes('not found')) {
          setError('Room not found. Please check the room ID.');
        } else if (error.message.includes('400')) {
          setError('Invalid request. Please check your input.');
        } else {
          setError('Failed to join room. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (userName.trim() && roomId.trim()) {
      setLoading(true);
      setError('');
      
      try {
        const response = await ApiService.createRoom(roomId.trim(), `Room ${roomId.trim()}`, userName.trim());
        console.log('Room created successfully:', response);
        onJoinRoom(roomId.trim(), userName.trim());
      } catch (error) {
        console.error('Error creating room:', error);
        if (error.message.includes('409') || error.message.includes('conflict')) {
          setError('Room ID already exists. Please choose a different room ID.');
        } else if (error.message.includes('400')) {
          setError('Invalid room data. Please check your input.');
        } else {
          setError('Failed to create room. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="join-room-container">
      <div className="join-room-card">
        <h1 className="join-room-title">Join Room..</h1>
        
        <form onSubmit={handleJoinRoom}>
          <div className="form-group">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomId">Room ID</label>
            <input
              type="text"
              id="roomId"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div className="button-group">
            <button 
              type="submit" 
              className="join-btn"
              disabled={!userName.trim() || !roomId.trim() || loading}
            >
              {loading ? 'Joining...' : 'Join Room'}
            </button>
            <button 
              type="button" 
              className="create-btn"
              onClick={handleCreateRoom}
              disabled={!userName.trim() || !roomId.trim() || loading}
            >
              {loading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;

import React, { useState, useEffect, useRef } from 'react';
import ApiService from '../services/api';
import WebSocketService from '../services/websocket';
import './ChatRoom.css';

const ChatRoom = ({ roomData, onLeaveRoom }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize WebSocket connection and load messages
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Connect to WebSocket
        await WebSocketService.connect();
        setConnected(true);
        console.log('WebSocket connected successfully');

        // Subscribe to room messages
        WebSocketService.subscribeToRoom(roomData.roomId, (message) => {
          console.log('Received message:', message);
          const formattedMessage = {
            id: message.id || Date.now(),
            userId: message.sender || 'unknown',
            userName: message.sender || 'Unknown User',
            message: message.content || message.message,
            timestamp: new Date(message.timeStamp || message.timestamp || Date.now()),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender || 'Unknown User')}&background=3b82f6&color=fff`
          };
          console.log('Formatted WebSocket message:', formattedMessage);
          console.log('Current user:', roomData.userName, 'Message sender:', formattedMessage.userName);
          setMessages(prev => [...prev, formattedMessage]);
        });

        // Load existing messages from API
        const messagesResponse = await ApiService.getRoomMessages(roomData.roomId);
        console.log('Messages API response:', messagesResponse);
        
        if (messagesResponse && messagesResponse.content) {
          console.log('Found messages in response:', messagesResponse.content);
          const formattedMessages = messagesResponse.content.map(msg => ({
            id: msg.id,
            userId: msg.userId,
            userName: msg.userName,
            message: msg.message,
            timestamp: new Date(msg.timestamp),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.userName)}&background=3b82f6&color=fff`
          }));
          console.log('Formatted messages:', formattedMessages);
          setMessages(formattedMessages);
        } else if (messagesResponse && Array.isArray(messagesResponse)) {
          // Handle case where response is directly an array
          console.log('Messages response is array:', messagesResponse);
          const formattedMessages = messagesResponse.map(msg => ({
            id: msg.id,
            userId: msg.userId || msg.sender,
            userName: msg.userName || msg.sender,
            message: msg.message || msg.content,
            timestamp: new Date(msg.timestamp || msg.timeStamp),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.userName || msg.sender)}&background=3b82f6&color=fff`
          }));
          console.log('Formatted messages from array:', formattedMessages);
          setMessages(formattedMessages);
        } else {
          console.log('No messages found or unexpected response format');
          setMessages([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error initializing chat:', error);
        console.error('Error details:', error.message);
        setLoading(false);
        // No fallback messages - start with empty chat
        setMessages([]);
      }
    };

    initializeChat();

    // Cleanup on unmount
    return () => {
      WebSocketService.disconnect();
    };
  }, [roomData.roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && connected) {
      const messageRequest = {
        roomId: roomData.roomId,
        userId: roomData.userId,
        userName: roomData.userName,
        message: newMessage.trim(),
        timestamp: new Date().toISOString()
      };

      console.log('Attempting to send message:', messageRequest);
      console.log('WebSocket connected:', connected);
      console.log('WebSocket service connected:', WebSocketService.isConnected());

      // Send message via WebSocket
      const success = WebSocketService.sendMessage(roomData.roomId, messageRequest);
      
      if (success) {
        console.log('Message sent successfully');
        setNewMessage('');
      } else {
        console.error('Failed to send message');
        // Optionally show error to user
      }
    } else {
      console.log('Cannot send message:', {
        hasMessage: !!newMessage.trim(),
        connected: connected,
        wsConnected: WebSocketService.isConnected()
      });
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-room-container">
      <div className="chat-header">
        <div className="room-info">
          <span className="room-id">Room: {roomData.roomId}</span>
          <span className="user-info">User: {roomData.userName}</span>
          <span className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
            {connected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>
        <button className="leave-btn" onClick={onLeaveRoom}>
          Leave Room
        </button>
      </div>

      <div className="chat-content">
        <div className="messages-container">
          {loading ? (
            <div className="loading-message" style={{ textAlign: 'center', padding: '20px' }}>
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="no-messages" style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>
              No messages yet. Start the conversation!
              <br />
              <small>Debug: Messages array length: {messages.length}</small>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwnMessage = msg.userName === roomData.userName || msg.userId === roomData.userId;
              console.log('Message alignment check:', {
                msgUserName: msg.userName,
                msgUserId: msg.userId,
                currentUserName: roomData.userName,
                currentUserId: roomData.userId,
                isOwnMessage: isOwnMessage
              });
              
              return (
                <div 
                  key={msg.id} 
                  className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
                >
                <div className="message-avatar">
                  <img src={msg.avatar} alt={msg.userName} />
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-author">{msg.userName}</span>
                    <span className="message-time">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className="message-text">{msg.message}</div>
                </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="message-input-container">
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <button type="submit" className="send-btn" disabled={!newMessage.trim() || !connected}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;

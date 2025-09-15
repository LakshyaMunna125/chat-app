import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscriptions = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      console.log('Attempting to connect to WebSocket at http://localhost:8001/chat');
      
      this.client = new Client({
        webSocketFactory: () => {
          console.log('Creating SockJS connection...');
          return new SockJS('http://localhost:8001/chat');
        },
        connectHeaders: {},
        debug: (str) => {
          console.log('STOMP Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: (frame) => {
          console.log('✅ Successfully connected to WebSocket:', frame);
          this.connected = true;
          resolve(frame);
        },
        onStompError: (frame) => {
          console.error('❌ STOMP error:', frame.headers['message']);
          console.error('Error details:', frame.body);
          this.connected = false;
          reject(new Error(`STOMP error: ${frame.headers['message']}`));
        },
        onWebSocketError: (error) => {
          console.error('❌ WebSocket connection error:', error);
          this.connected = false;
          reject(new Error(`WebSocket error: ${error.message || error}`));
        },
        onDisconnect: (frame) => {
          console.log('🔌 Disconnected from WebSocket:', frame);
          this.connected = false;
        },
        onWebSocketClose: (event) => {
          console.log('🔌 WebSocket connection closed:', event);
          this.connected = false;
        }
      });

      // Add timeout for connection attempt
      const connectionTimeout = setTimeout(() => {
        if (!this.connected) {
          console.error('❌ WebSocket connection timeout');
          this.client.deactivate();
          reject(new Error('WebSocket connection timeout'));
        }
      }, 10000); // 10 second timeout

      this.client.onConnect = (frame) => {
        clearTimeout(connectionTimeout);
        console.log('✅ Successfully connected to WebSocket:', frame);
        this.connected = true;
        resolve(frame);
      };

      try {
        console.log('🔄 Activating WebSocket client...');
        this.client.activate();
      } catch (error) {
        clearTimeout(connectionTimeout);
        console.error('❌ Failed to activate WebSocket client:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.client && this.connected) {
      // Unsubscribe from all subscriptions
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      this.subscriptions.clear();
      
      this.client.deactivate();
      this.connected = false;
    }
  }

  subscribeToRoom(roomId, onMessageReceived) {
    if (!this.connected || !this.client) {
      console.error('WebSocket not connected');
      return null;
    }

    const destination = `/topic/room/${roomId}`;
    
    // Unsubscribe from previous subscription if exists
    if (this.subscriptions.has(roomId)) {
      this.subscriptions.get(roomId).unsubscribe();
    }

    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const messageData = JSON.parse(message.body);
        onMessageReceived(messageData);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    this.subscriptions.set(roomId, subscription);
    return subscription;
  }

  sendMessage(roomId, messageRequest) {
    if (!this.connected || !this.client) {
      console.error('WebSocket not connected');
      return false;
    }

    try {
      // Transform message to match backend MessageRequest format
      const backendMessage = {
        sender: messageRequest.userName,
        content: messageRequest.message,
        messageTime: messageRequest.timestamp
      };
      
      console.log('Sending message to room:', roomId, backendMessage);
      this.client.publish({
        destination: `/app/sendMessage/${roomId}`,
        body: JSON.stringify(backendMessage)
      });
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }

  isConnected() {
    return this.connected;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;

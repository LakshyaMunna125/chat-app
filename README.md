# Chat Room App

A real-time chat application built with React that supports multiple chat rooms with WebSocket communication.

## Features

- **Real-time messaging** using WebSocket (STOMP protocol)
- **Multiple chat rooms** - Create or join existing rooms
- **Message history** - Load previous messages when joining a room
- **User avatars** - Automatically generated based on username
- **Responsive design** - Works on desktop and mobile devices
- **Connection status** - Visual indicator of WebSocket connection status

## API Integration

The application integrates with a backend API running on `http://localhost:8001` with the following endpoints:

### REST API Endpoints

- `POST /v1/room` - Create a new chat room
- `POST /v1/room/{roomId}?name={userName}` - Join an existing room
- `GET /v1/room/{roomId}/messages?page={page}&size={size}` - Get room message history

### WebSocket Endpoints

- **Connection**: `ws://localhost:8001/ws` (using SockJS)
- **Subscribe**: `/topic/room/{roomId}` - Listen for new messages in a room
- **Send**: `/app/sendMessage/{roomId}` - Send a message to a room

## Technologies Used

- **React 18** - Frontend framework
- **STOMP.js** - WebSocket messaging protocol
- **SockJS** - WebSocket fallback support
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend API server running on `http://localhost:8001`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Requirements

The application expects a backend server with:
- REST API endpoints for room management and message history
- WebSocket support with STOMP protocol
- SockJS fallback support
- CORS enabled for `http://localhost:3000`

## Usage

1. **Join a Room**: Enter your name and an existing room ID, then click "Join Room"
2. **Create a Room**: Enter your name and click "Create Room" to generate a new room
3. **Send Messages**: Type your message and press Enter or click "Send"
4. **Leave Room**: Click "Leave Room" to return to the join screen

## Project Structure

```
src/
├── components/
│   ├── JoinRoom.js          # Room joining/creation component
│   ├── JoinRoom.css         # Styling for join room
│   ├── ChatRoom.js          # Main chat interface
│   └── ChatRoom.css         # Styling for chat room
├── services/
│   ├── api.js               # REST API service
│   └── websocket.js         # WebSocket service
├── App.js                   # Main application component
├── App.css                  # Global styles
└── index.js                 # Application entry point
```

## Error Handling

- **Connection Failures**: Falls back to mock data if API/WebSocket connection fails
- **Room Not Found**: Shows error message when trying to join non-existent room
- **Send Failures**: Prevents sending messages when WebSocket is disconnected
- **Loading States**: Shows loading indicators during API calls

## Development

To modify the API endpoints, update the `API_BASE_URL` in `src/services/api.js` and the WebSocket URL in `src/services/websocket.js`.

## Build

To create a production build:

```bash
npm run build
```

The build folder will contain the optimized production files.

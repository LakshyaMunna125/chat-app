const API_BASE_URL = 'http://localhost:8001/v1';

class ApiService {
  // Create a new room
  async createRoom(roomId, roomName, userName) {
    try {
      console.log('Creating room with:', { roomId, roomName, userName });
      const response = await fetch(`${API_BASE_URL}/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          roomName,
          userName
        })
      });

      console.log('Create room response status:', response.status);
      console.log('Create room response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get response text first to debug
      const responseText = await response.text();
      console.log('Create room response text:', responseText);
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.log('Response was not valid JSON, treating as success');
        return { success: true, message: 'Room created successfully' };
      }
      
      console.log('Create room response data:', data);
      return data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }

  // Join an existing room
  async joinRoom(roomId, userName) {
    try {
      console.log('Joining room with:', { roomId, userName });
      const response = await fetch(`${API_BASE_URL}/room/${roomId}?name=${encodeURIComponent(userName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Join room response status:', response.status);
      console.log('Join room response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get response text first to debug
      const responseText = await response.text();
      console.log('Join room response text:', responseText);
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.log('Response was not valid JSON, treating as success');
        return { success: true, message: 'Joined room successfully' };
      }
      
      console.log('Join room response data:', data);
      return data;
    } catch (error) {
      console.error('Error joining room:', error);
      throw error;
    }
  }

  // Get all messages from a room
  async getRoomMessages(roomId, page = 0, size = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/room/${roomId}/messages?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;

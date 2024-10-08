import React from 'react';
import ChatContainer from './components/ChatContainer';
import HealthChatbot from './components/HealthChatbot';

function App() {
  return (
    <div className="App">
      <ChatContainer>
        <HealthChatbot />
      </ChatContainer>
    </div>
  );
}

export default App;
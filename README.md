# Health Chatbot Application

This project consists of a Flask backend and a React frontend for a health chatbot application.

## Project Structure

```
.
├── src/
│   ├── backend/
│   │   └── app.py
│   ├── components/
│   │   ├── ChatContainer.tsx
│   │   ├── CustomScrollbar.tsx
│   │   ├── HealthChatbot.tsx
│   │   ├── InputField.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── SendButton.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── scroll-area.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── index.html
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── requirements.txt
└── tsconfig.json
```

## Updating the Backend

The backend is located in `src/backend/app.py`. When updating the backend logic:

1. Ensure Flask and required dependencies are installed (`pip install -r requirements.txt`).
2. Maintain the existing route (`/api/chatbot`) unless you're also updating the frontend to match.
3. Keep the CORS configuration to allow frontend requests.
4. If adding new dependencies, update `requirements.txt`.
5. Test your changes locally before committing.

Example of updating the chatbot logic:

```python
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_input = data.get('input', '')

    # Update your chatbot logic here
    response = your_updated_chatbot_logic(user_input)
    
    return jsonify({'response': response})
```

## Updating the Frontend

The frontend is a React application using TypeScript. When updating the frontend:

1. Ensure all dependencies are installed (`npm install`).
2. Main application logic is in `src/App.tsx` and components are in `src/components/`.
3. Maintain the overall structure of `App.tsx` unless you're refactoring the entire application.
4. When updating or adding components, keep them in the `src/components/` directory.
5. Use TypeScript for type safety. Update `tsconfig.json` if needed.
6. Test your changes locally (`npm start`) before committing.

Example of updating a component:

```typescript
// src/components/HealthChatbot.tsx
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

const HealthChatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = async () => {
    // Update API call logic here
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    setMessages([...messages, `You: ${input}`, `Bot: ${data.response}`]);
    setInput('');
  };

  return (
    <Card>
      {/* Update UI components here */}
    </Card>
  );
};

export default HealthChatbot;
```

## Development Workflow

1. Use your preferred external editor to make changes.
2. For backend changes:
   - Run the Flask server locally (`python src/backend/app.py`).
   - Test endpoints using tools like Postman or curl.
3. For frontend changes:
   - Run the React development server (`npm start`).
   - Test in the browser (usually at `http://localhost:3000`).
4. Commit changes frequently and use descriptive commit messages.
5. If working in a team, consider using feature branches and pull requests.

By following these guidelines, you can safely update both the backend logic and frontend interface using external editors without breaking existing functionality.
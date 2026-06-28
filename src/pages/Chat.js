import React, { useState, useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

 useEffect(() => {
    // Purane messages load karo
    axios.get('http://localhost:5000/api/messages')
      .then(res => {
        setMessages(res.data.map(m => ({ text: m.message, sender: 'other' })));
      });

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, { text: data.message, sender: 'other' }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { message });
      setMessages((prev) => [...prev, { text: message, sender: 'me' }]);
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#075E54', color: 'white', padding: '15px', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>💬 Chat App</h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#ECE5DD' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
            <div style={{ backgroundColor: msg.sender === 'me' ? '#DCF8C6' : 'white', padding: '10px 15px', borderRadius: '10px', maxWidth: '70%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', padding: '10px', backgroundColor: '#F0F0F0' }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', border: 'none', marginRight: '10px', outline: 'none' }}
        />
        <button type="submit" style={{ backgroundColor: '#075E54', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', fontSize: '18px' }}>
          ➤
        </button>
      </form>
    </div>
  );
}

export default Chat;
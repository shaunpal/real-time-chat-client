import React from 'react';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Screen.css';

const Screen = ({ messages, name, clientid }) => {
   return (
    <ScrollToBottom className="chat-container-screen">
        {messages.map((message, idx) => (
        <div key={idx}>
            <Message message={message} name={name} clientid={clientid} />
        </div>
        ))}
    </ScrollToBottom>
   ) 
}

export default Screen;
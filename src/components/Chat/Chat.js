import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Screen  from '../Screen/Screen';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = "https://real-time-chat-server.herokuapp.com/";

    useEffect(() => {
        const { name } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        let randId = Math.random().toString(16).substring(0, 10);
        setId(randId);

        socket.emit('join', { name, clientid: randId }, () => {
            
        });
        
        
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages,  message]);
            if(message.users){
                setUsers(message.users);
            }
        })
    }, [messages, users]);
    
    useEffect(() => {
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })
    }, [users]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message)
            socket.emit('sendMessage', message, () => setMessage(''));
    }

    return(
        <div className="outerContainer">
            <div className="memberContainer card">
            <span className="member-heading card-header"><h1>ChatterBox</h1></span>
                <div className="member">
                    {users.map((user) => (
                        <div className="column" key={user.id}>
                            <span className="shortname" style={{backgroundColor: `${user.color}`}}>{user.name.substring(0, 2).toUpperCase()}</span>
                            <p style={{color: `${user.color}`}}>{user.name}</p>
                            {(user.name === name && user.clientid === id)? <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person-fill user-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg> : null}
                        </div>
                    ))}
                </div>
            </div>
            <div className="card">
                <div className="container chat-container">

                <Screen messages={messages} name={name} clientid={id} />

                <div className="input-group message-input mb-3">
                    <input type="text" className="form-control form-input-field" placeholder="Type message..." aria-label="Type message..." aria-describedby="basic-addon2"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === "Enter"? sendMessage(event) : null} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button"
                        onClick={event => message !== ""? sendMessage(event) : null}>Send</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
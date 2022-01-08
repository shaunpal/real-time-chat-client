import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Screen  from '../Screen/Screen';
import { FaUser, FaUpload } from 'react-icons/fa';
import { BiX } from "react-icons/bi";
import Dropzone from 'react-dropzone';
import ZoomWindow from '../ZoomWindow/ZoomWindow';
import { useSelector, useDispatch } from 'react-redux';
import { normState } from "../../reducers/isZoom";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = "https://real-time-chat-server.herokuapp.com/";
    const extensions = ["txt", "jpeg", "jpg", "png", "mp3", "mp4", "gif", "pdf"];
    const zoomimg = useSelector(state => state.img);
    const zoomshow = useSelector(state => state.show);
    const dispatch = useDispatch()

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
   
    const uploadEvent = (files) => {
        for(let i =0; i < files.length; i++){
            let ext = files[i].name.split(".").pop();
            if(extensions.includes(ext)){
                let reader = new FileReader();
                reader.readAsDataURL(files[i]);
                
                // eslint-disable-next-line
                reader.onloadend = (evt) => {
                    var file = {};
                    file.name = files[i].name
                    file.data = evt.target.result
                    socket.emit('sendMessage', file, () => setMessage(''));
                }
            }
        }
    }
    return(
        <div style={{ height: "inherit" }}>
        <ZoomWindow img={zoomimg} isOpen={zoomshow} />
        <BiX style={zoomshow? styles.closebtn : styles.notZoom } size={40} onClick={() =>  {
                                    dispatch(normState());
                                }}/>
        <div className={!zoomshow? "outerContainer": "hidediv"}>
            <div className={!zoomshow? "memberContainer card" : "hidediv"}>
            <span className="member-heading card-header"><h1>ChatterBox</h1></span>
                <div className="member">
                    {users.map((user) => (
                        <div className="column" key={user.id}>
                            <span className="shortname" style={(user.name === name && user.clientid === id)? {backgroundColor: `${user.color}`, borderWidth: "4px", borderColor: "#afff03" }: {backgroundColor: `${user.color}`}}>{user.name.substring(0, 2).toUpperCase()}</span>
                            <p style={{color: `${user.color}`}}>{user.name}</p>
                            {(user.name === name && user.clientid === id)? <div className="user-icon"><FaUser size={24}/></div> : null}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ position: "static" }} className="card">
                <div className="container chat-container">

                <Screen className="screen-container" messages={messages} name={name} clientid={id} />

                <div className="input-group message-input mb-3">
                    <input type="text" className="form-control form-input-field" placeholder="Type message..." aria-label="Type message..." aria-describedby="basic-addon2"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === "Enter"? sendMessage(event) : null} />
                    <div className="input-group-append">
                        <button className="btn">
                            <Dropzone onDrop={uploadEvent}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <FaUpload size={20} /> 
                                </div>
                                </section>
                            )}
                            </Dropzone>
                        </button>
                        <button className="btn btn-secondary" type="button"
                        onClick={event => message !== ""? sendMessage(event) : null}>Send</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
};

const styles = {
    closebtn: {
        color: "white",
        size: "10",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 3,
        cursor: "pointer"
    },
    notZoom: {
        display: "none",
        visibility: "hidden"
    },
}

export default Chat;

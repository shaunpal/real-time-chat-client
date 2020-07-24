import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';


const Join = () => {

    const [name, setName] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">ChatterBox</h1>
                <div><input placeholder="Name" className="joinInput" name="name" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <Link onClick={ event => (!name)? event.preventDefault(): null } to={`/chat?name=${name}`}>
                    <button className="button" type="submit">Enter Chatroom </button>
                </Link>
            </div>

        </div>
    );
};

export default Join;

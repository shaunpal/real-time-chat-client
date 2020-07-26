import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';


const Join = () => {

    const [name, setName] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer card">
                <h1 className="heading">ChatterBox</h1>
                <div className="form-group">
                    <input placeholder="Name" className="joinInput form-control" name="name" type="text" onChange={(event) => setName(event.target.value)} />
                    <Link onClick={ event => (!name)? event.preventDefault(): null } to={`/chat?name=${name}`}>
                        <button className="btn btn-info joinBtn" type="submit">Enter Chatroom </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Join;

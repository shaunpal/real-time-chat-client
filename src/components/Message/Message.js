import React from 'react';
import './Message.css';


const Message = ({ message: { user, text, color, client_id, message }, name, clientid }) => {
    return(
        <div>
            {(text === "")?
            <div className="messageContainerAll">
                <div className="messagetoall">
                    <p>{message}</p>
                </div>
            </div>
            : 
            <div>
                {(user === name  && client_id === clientid )?
                <div className="messageContainer-end d-flex justify-content-end">
                    <div className="messagediv card-end card">
                        <p>{text}</p>
                    </div>
                </div>
                :
                <div className="messageContainer-start d-flex justify-content-start">
                    <div className="messagediv card-start card">
                        <p className="div-name" style={{color: `${color}`}}>{user}</p>
                        <p className="div-text">{text}</p>
                    </div>
                </div>
                }
            </div>
            }    
        </div> 
    );
}

export default Message;
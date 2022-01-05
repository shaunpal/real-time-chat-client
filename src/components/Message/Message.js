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
                <div className="messageContainer-end">
                    <div className="messagediv card-end card">
                        {text.includes("data:image")?
                        <img 
                            style={{ maxWidth: "10em"}}
                            src={text}
                            alt={'media'}
                        />
                        :
                        text.includes("data:video")?
                        <video 
                            style={{ maxWidth: "10em"}}
                            src={text}
                            alt={'video'}
                            type='video/mp4'
                            controls={true}
                        />
                        :
                        text.includes("data:text/plain")?
                        <embed 
                        style={{ maxWidth: "10em", overflow: "hidden !important" }}
                        type={'text/html'}
                        src={text}
                        />
                        :
                        text.includes("data:application/pdf")?
                        <embed 
                        style={{ maxWidth: "10em"}}
                        type={"application/pdf"}
                        src={text}
                        />
                        :
                        <p>{text}</p>
                        }
                    </div>
                </div>
                :
                <div className="messageContainer-start d-flex justify-content-start">
                    <div className="messagediv card-start card">
                        <p className="div-name" style={{color: `${color}`}}>{user}</p>
                        {text.includes("data:image")?
                        <div>
                            <img 
                                style={{ maxWidth: "8em" }}
                                src={text}
                                alt={'media'}
                            />
                        </div>
                        :
                        text.includes("data:video")?
                        <video 
                            style={{ maxWidth: "8em"}}
                            src={text}
                            alt={'video'}
                            type='video/mp4'
                            controls={true}
                        />
                        :
                        text.includes("data:text/plain")?
                        <embed 
                        style={{ maxWidth: "8em", overflow: "hidden !important" }}
                        type={'text/html'}
                        src={text}
                        />
                        :
                        text.includes("data:application/pdf")?
                        <embed 
                        style={{ maxWidth: "8em"}}
                        type={"application/pdf"}
                        src={text}
                        />
                        :
                        <p>{text}</p>
                        }
                    </div>
                </div>
                }
            </div>
            }    
        </div> 
    );
}

export default Message;
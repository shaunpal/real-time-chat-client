import React from 'react';
import './Message.css';
import { useDispatch } from 'react-redux';
import {zoomState} from "../../reducers/isZoom";
import { GoFile, GoFilePdf, GoCheck } from "react-icons/go";

const Message = ({ message: { user, text, color, client_id, message }, name, clientid }) => {
    const dispatch = useDispatch();

    return(
        <div style={{ position: "static" }}>
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
                        {typeof(text) === "object" && text.data.includes("data:image")?
                            <img
                                style={{ maxWidth: "10em", cursor: "pointer"}}
                                src={text.data}
                                alt={'media'}
                                onClick={() =>  {
                                    dispatch(zoomState(text.data));
                                }}
                            />   
                        :
                        typeof(text) === "object" && text.data.includes("data:video")?
                        <video 
                            style={{ maxWidth: "10em"}}
                            src={text.data}
                            alt={'video'}
                            type='video/mp4'
                            controls={true}
                        />
                        :
                        typeof(text) === "object" && text.data.includes("data:text/plain")?
                        <div onClick={() => dispatch(zoomState(text.data))} style={styles.msgdocument}>
                            <GoFile size={60}></GoFile>
                            <span>{text.name}</span>
                        </div>
                        :
                        typeof(text) === "object" && text.data.includes("data:application/pdf")?
                        <div onClick={() => dispatch(zoomState(text.data))} style={styles.msgdocument}>
                            <GoFilePdf style={{ color: "#c40a0a", marginTop: "3px" }} size={60}/>
                            <span>{text.name}</span>
                        </div>
                        :
                        <p>{text}</p>
                        }
                        {typeof(text) === "object"?
                        <p style={{ position: "absolute", bottom: "-1.5em", right: "1em", fontSize: 10, color: "#686b69" }}>Uploaded <GoCheck size={10}/></p>    
                        :
                        null
                        }
                    </div>
                </div>
                :
                <div className="messageContainer-start d-flex justify-content-start">
                    <div className="messagediv card-start card">
                        <p className="div-name" style={{color: `${color}`}}>{user}</p>
                        {typeof(text) === "object" && text.data.includes("data:image")?
                        <div>
                            <img 
                                style={{ maxWidth: "8em", marginBottom: "3px" }}
                                src={text.data}
                                alt={'media'}
                            />
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <a href={text.data} download={text.name}><button className={"btn btn-light btn-sm"}>Download</button></a>
                                <button className={"btn btn-light btn-sm"} onClick={() => dispatch(zoomState(text.data))}>View</button>
                            </div>
                        </div>
                        :
                        typeof(text) === "object" && text.data.includes("data:video")?
                        <video 
                            style={{ maxWidth: "8em"}}
                            src={text.data}
                            alt={'video'}
                            type='video/mp4'
                            controls={true}
                        />
                        :
                        typeof(text) === "object" && text.data.includes("data:text/plain")?
                        <div>
                            <GoFile size={60}></GoFile>
                            <p>{text.name}</p>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <a href={text.data} download={text.name}><button className={"btn btn-light btn-sm"}>Download</button></a>
                                <button className={"btn btn-light btn-sm"} onClick={() => dispatch(zoomState(text.data))}>View</button>
                            </div>
                        </div>
                        :
                        typeof(text) === "object" && text.data.includes("data:application/pdf")?
                        <div>
                            <GoFilePdf style={{ color: "#c40a0a", marginTop: "3px" }} size={60}/>
                            <p>{text.name}</p>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <a href={text.data} download={text.name}><button className={"btn btn-light btn-sm"}>Download</button></a>
                                <button className={"btn btn-light btn-sm"} onClick={() => dispatch(zoomState(text.data))}>View</button>
                            </div>
                        </div>
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

const styles = {
    msgdocument: { 
        borderRadius: 8,
        backgroundColor: 'white', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: "center", 
        flexDirection: "column",
        cursor: "pointer"
    }
    
}

export default Message;
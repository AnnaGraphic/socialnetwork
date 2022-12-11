import { useState, useEffect, useRef } from "react";

function Chat(props) {
    const elemRef = useRef();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("api/latestmessages")
            .then((res) => res.json())
            .then((response) => {
                console.log("api/latestmessages response", response);
                //   setMessages([response]);
            });
    }, []);

    return (
        useState,
        (
            <div className="main">
                <p>chat</p>
                <div id="chat-messages" ref={elemRef}>
                    /* messages go here */
                    <ul>
                        {messages.map((message) => {
                            return (
                                <li key={message.id}>
                                    <h5> {`message von panda xy`}</h5>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    );
}
export default Chat;

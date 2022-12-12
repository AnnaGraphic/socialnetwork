import { useState, useEffect, useRef } from "react";
import { socket } from "../../socket";
import SubmitButton from "../SubmitButton";

function Chat(props) {
    const [text, setText] = useState("");
    const elemRef = useRef(); //current
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("/api/latestmessages")
            .then((res) => res.json())
            .then((response) => {
                // console.log("api/latestmessages response", response);
                setMessages([...response]);
            });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("text: ", text);
        socket.emit("chatMessage", {
            message: text,
        });
    };

    return (
        useState,
        (
            <div className="main">
                <p>chat</p>
                <div id="userinput">
                    <label htmlFor="message here ..."></label>
                    <textarea
                        name="usermessage"
                        onChange={(e) => setText(e.target.value)}
                        placeholder="write message ..."
                    ></textarea>
                    <button
                        // route="/sendmessage"
                        // payload={{ userinput: text }}
                        // onSuccess={() => {
                        //     console.log("send message");
                        //     //render results
                        // }}
                        // onError={() => {}}
                        onClick={sendMessage}
                    >
                        send
                    </button>
                </div>
                <div id="chat-messages" ref={elemRef}>
                    <ul>
                        {messages?.map((message) => {
                            // console.log("message", message);
                            return (
                                <li key={message.id}>
                                    <img
                                        src={
                                            message.profilepic_url ||
                                            "/default_usericon_1.png"
                                        }
                                        alt={`${message.first_name} ${message.last_name}`}
                                    />
                                    <h5>
                                        {message.first_name}
                                        {message.last_name}
                                    </h5>{" "}
                                    <p> wrote: </p>
                                    <div>
                                        <p>{message.text}</p>
                                    </div>
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

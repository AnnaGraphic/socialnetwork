import { useState, useEffect, useRef } from "react";
//import { socket } from "../../socket";
import SubmitButton from "../SubmitButton";
import { io } from "socket.io-client";

let socket = io.connect();

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

    useEffect(() => {
        console.log("messages 1", messages);
        socket.on("chatMessage", (data) => {
            //console.log("data in useEffect Chat.js", data);
            const arr = [data, ...messages];
            //console.log("arr", arr);
            setMessages(arr);
        });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        //console.log("messages", messages);

        socket.emit("chatMessage", {
            message: text,
        });
        //console.log("text: ", text);
        setText("");
    };

    return (
        useState,
        (
            <div className="chatboard">
                <div id="chat-messages">
                    <ul>
                        {messages?.map((message, index) => {
                            // console.log("message", message);
                            return (
                                <li key={index}>
                                    <div className="chat">
                                        <img
                                            className="chatimg"
                                            src={
                                                message.profilepic_url ||
                                                "/default_usericon_1.png"
                                            }
                                            alt={`${message.first_name} ${message.last_name}`}
                                        />
                                        <div className="chatmessage">
                                            <div>
                                                <p>
                                                    <b>
                                                        {message.first_name}
                                                        &nbsp;
                                                        {message.last_name}
                                                        &nbsp;
                                                    </b>
                                                </p>
                                            </div>
                                            <div>
                                                <p>{message.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
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
            </div>
        )
    );
}
export default Chat;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function MultiButton(props) {
    // const friendshipStatus = useState wenn ich den friendshipstatus hier speichern will
    // const [buttonText, setButtonText] = useState("multi button");
    const { id } = useParams();
    const [connectionStatus, setConnectionStatus] = useState({
        connectionstatus: "",
        buttonText: "loading ...",
    });

    useEffect(() => {
        fetch(`/api/connectionstatus/${id}`)
            .then((res) => res.json())
            .then((response) => {
                if (response) {
                    console.log("multibutton response", response);
                    setConnectionStatus(response);
                } else {
                    //"success false"
                    console.log("success false, response", response);
                }
            });
    }, []);

    function handleClick() {
        if (connectionStatus.connectionstatus === "noconnection") {
            fetch(`/api/contacts/${id}`, {
                method: "POST",
            });
        } else if (connectionStatus.connectionstatus === "pending") {
            fetch(`/api/contacts/${id}`, {
                method: "DELETE",
            });
        } else if (connectionStatus.connectionstatus === "recieved") {
            fetch(`/api/contacts/${id}`, {
                method: "PUT",
            });
        } else if (connectionStatus.connectionstatus === "connected") {
            fetch(`/api/contacts/${id}`, {
                method: "DELETE",
            });
        }

        // a row would be inserted with the ids of the sender and receiver in the appropriate columns and the boolean set to false
        console.log(
            "handleClick connectionStatus: 1234",
            connectionStatus.connectionstatus
        );
    }

    return <button onClick={handleClick}>{connectionStatus.buttonText}</button>;
}

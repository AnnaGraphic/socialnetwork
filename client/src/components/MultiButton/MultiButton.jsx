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
        fetch(`/connectionstatus/${id}`)
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
        console.log(
            "handleClick connectionStatus:",
            connectionStatus["buttonText"]
        );
        if (connectionStatus.connectionstatus === "noconnection") {
            fetch(`/contacts/${id}`, {
                method: "POST",
            });
        } else if (connectionStatus.connectionstatus === "pending") {
            fetch(`/contacts/${id}`, {
                method: "DELETE",
            });
        } else if (connectionStatus.connectionstatus === "recieved") {
            //        accept
        } else if (connectionStatus.connectionstatus === "connected") {
            fetch(`/contacts/${id}`, {
                method: "DELETE",
            });
        }

        // a row would be inserted with the ids of the sender and receiver in the appropriate columns and the boolean set to false
        console.log("handleClick");
    }

    return <button onClick={handleClick}>{connectionStatus.buttonText}</button>;
}

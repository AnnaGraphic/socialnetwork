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
                    // console.log("multibutton response", response);
                    setConnectionStatus(response);
                } else {
                    //"success false"
                    console.log("success false, response", response);
                }
            });
    }, []);

    function handleClick() {
        //1. wenn keine request offen,
        // text: "connect"
        // a row would be inserted with the ids of the sender and receiver in the appropriate columns and the boolean set to false
        console.log("handleClick");
    }

    //1. den richtigen text bekommen
    // - server fragen, wie der status der freundschaft ist vie useEffect (fuer initiale GET request)
    //2. handleClick implementieren mit if else fuer 3-4 moeglichen Aktionen
    //3. wenn button fertig ist, einbauen bei OtherProfile
    return <button onClick={handleClick}>{connectionStatus.buttonText}</button>;
}

import { createRoot } from "react-dom/client";
import Welcome from "./components/Welcome";
import App from "./components/App";
import Login from "./components/Login";

const root = createRoot(document.querySelector("main"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("start.js data", data);
        // the userId comes from the session on the server!
        // this means: the user is currently signed in!
        if (data.userId) {
            root.render(<App />);
        } else {
            root.render(<Welcome />);
        }
    });

import { createRoot } from "react-dom/client";
import Welcome from "./components/Welcome";
import App from "./components/App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/rootReducer";
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const root = createRoot(document.querySelector("main"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("start.js data", data);
        // the userId comes from the session on the server!
        // this means: the user is currently signed in!
        if (data.userId) {
            root.render(
                <Provider store={store}>
                    {" "}
                    <App />{" "}
                </Provider>
            );
        } else {
            root.render(<Welcome />);
        }
    });

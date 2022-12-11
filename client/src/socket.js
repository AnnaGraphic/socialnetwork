import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("welcome", (data) => {
            console.log(data);
        });
    }
};

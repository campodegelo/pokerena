// import { chatMessages, chatMessage, onlineUsers } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        // socket.on("chatMessages", msgs => {
        //     // console.log("data from chatMessages in socket.js: ", msgs);
        //     store.dispatch(chatMessages(msgs));
        // });

        // socket.on("chatMessage", data => {
        //     // console.log("msg from chatMessage in socket.js: ", data);
        //     store.dispatch(chatMessage(data));
        // });

        // socket.on("onlineUsers", data => {
        //     // console.log("online Users are : ", data);
        //     store.dispatch(onlineUsers(data));
        // });
    }
};

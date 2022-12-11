export default function messagessReducer(messages = [], action) {
    if (action.type === "set-all-requests-contacts") {
        return action.payload.requests;
    }
    return messages;
}
// action
export function setMessages(messages) {
    return {
        type: "set-messages",
        payload: { messages },
    };
}

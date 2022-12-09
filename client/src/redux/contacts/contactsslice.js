export default function contactsReducer(contacts = [], action) {
    if (action.type === "set-all-requests-contacts") {
        return action.payload.requests;
    }
    return contacts;
}

// action
export function setRequestsAndContacts(requests) {
    return {
        type: "set-all-requests-contacts",
        payload: { requests },
    };
}

// export function acceptFriendRequest(id) {

// }

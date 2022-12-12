const initialState = { contacts: [] };

export default function contactsReducer(contacts = initialState, action) {
    if (action.type === "set-all-requests-contacts") {
        return { ...contacts, contacts: action.payload.requests };
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

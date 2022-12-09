// const initialState = {
//     bioText: "",
// };
import { combineReducers } from "redux";
import contactsReducer from "./contacts/contactsslice";

const rootReducer = combineReducers({
    contacts: contactsReducer,
});

export default rootReducer;

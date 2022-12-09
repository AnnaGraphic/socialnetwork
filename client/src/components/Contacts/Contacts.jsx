import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRequestsAndContacts } from "../../redux/contacts/contactsslice";

export default function Contacts() {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => {
        //can't put filter on null!
        return (
            state.contacts &&
            state.contacts.filter((contact) => contact.accepted)
        );
    });

    useEffect(() => {
        fetch("/api/contactlist")
            .then((result) => result.json())
            .then((contacts) => {
                dispatch(setRequestsAndContacts(contacts));
                console.log("contacts", contacts);
            });
    }, []);

    return (
        <>
            <h6>contacts</h6>
            {contacts &&
                contacts.map((contact) => {
                    return (
                        <div key={contact.id}>
                            {/* //maybe some info about contact 
                            //button unfriend / decline */}
                        </div>
                    );
                })}
            <h6>contact requests</h6>
        </>
    );
}

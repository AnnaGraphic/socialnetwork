import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRequestsAndContacts } from "../../redux/contacts/contactsslice";
import { Link } from "react-router-dom";

export default function Contacts() {
    const dispatch = useDispatch();

    const contacts = useSelector((state) => {
        //can't put filter on null!
        return (
            state.contacts &&
            state.contacts.filter((contact) => contact.accepted)
        );
    });

    const requests = useSelector((state) => {
        //can't put filter on null!
        return (
            state.contacts &&
            state.contacts.filter((contact) => !contact.accepted)
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
            <ul>
                {contacts &&
                    contacts?.map((panda) => {
                        console.log("panda after map", panda);
                        return (
                            <li key={panda.id}>
                                <h5>{`${panda.id}`}</h5>
                                {/* //maybe some info about contact 
                            //button unfriend / decline */}
                            </li>
                        );
                    })}
            </ul>
            <h6>contact requests</h6>
            {requests &&
                requests?.map((panda) => {
                    return (
                        <ul>
                            <li key={panda.id}>
                                <h5>{`${panda.id}`}</h5>
                                {/* //maybe some info about contact 
                            //button unfriend / decline */}
                            </li>
                        </ul>
                    );
                })}
        </>
    );
}

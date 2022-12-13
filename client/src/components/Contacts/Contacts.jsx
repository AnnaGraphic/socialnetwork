import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRequestsAndContacts } from "../../redux/contacts/contactsslice";
import { Link } from "react-router-dom";

export default function Contacts() {
    const dispatch = useDispatch();

    const contacts = useSelector((state) => {
        //can't put filter on null!
        return (
            state.contacts.contacts &&
            state.contacts.contacts.filter((contact) => contact.accepted)
        );
    });

    const requests = useSelector((state) => {
        //can't put filter on null!
        return (
            state.contacts.contacts &&
            state.contacts.contacts.filter((contact) => !contact.accepted)
        );
    });

    useEffect(() => {
        fetch("/api/contactlist")
            .then((result) => {
                console.log(result);
                return result.json();
            })
            .then((contacts) => {
                console.log("contacts", contacts);
                dispatch(setRequestsAndContacts(contacts));
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
                                <h5>{`${panda.first_name} ${panda.last_name}`}</h5>
                                <img
                                    src={`${
                                        panda.profilepic_url ||
                                        "/default_usericon_1.png"
                                    }`}
                                    alt=""
                                />
                            </li>
                        );
                    })}
            </ul>
            <h6>contact requests</h6>
            <ul>
                {requests &&
                    requests?.map((panda) => {
                        return (
                            <li key={panda.id}>
                                <h5>{`${panda.first_name} ${panda.last_name}`}</h5>
                                <img
                                    src={`${
                                        panda.profilepic_url ||
                                        "/default_usericon_1.png"
                                    }`}
                                    alt=""
                                />
                            </li>
                        );
                    })}
            </ul>
        </>
    );
}

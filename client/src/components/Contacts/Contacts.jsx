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
            <div className="contacts">
                <h5>contacts</h5>
                <ul>
                    {contacts &&
                        contacts?.map((panda) => {
                            console.log("panda after map", panda);
                            return (
                                <li key={panda.id}>
                                    <p>{`${panda.first_name} ${panda.last_name}`}</p>
                                    <div className="profilePic">
                                        <Link to={`/userprofile/${panda.id}`}>
                                            <img
                                                src={`${
                                                    panda.profilepic_url ||
                                                    "/default_usericon_1.png"
                                                }`}
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                <h5>contact requests</h5>
                <ul>
                    {requests &&
                        requests?.map((panda) => {
                            return (
                                <li key={panda.id}>
                                    <p>{`${panda.first_name} ${panda.last_name}`}</p>
                                    <div>
                                        <Link to={`/userprofile/${panda.id}`}>
                                            <img
                                                src={`${
                                                    panda.profilepic_url ||
                                                    "/default_usericon_1.png"
                                                }`}
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}

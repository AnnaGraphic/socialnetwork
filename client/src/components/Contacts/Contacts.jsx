import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Contacts() {
    const contacts = useSelector((state) => {
        //can't put filter on null!
        return (
            state.contacts &&
            state.contacts.filter((contact) => contact.accepted)
        );
    });

    useEffect(() => {
        // return {
        //     type: 'friends/received',
        //     //action
        // }
    }, []);

    return (
        <>
            <h2>contacts</h2>
            {contacts &&
                contacts.map((friend) => {
                    return (
                        <div key={contact.id}>
                            {/* //maybe some info about contact 
                            //button unfriend / decline */}
                        </div>
                    );
                })}
        </>
    );
}

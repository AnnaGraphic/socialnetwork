import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MultiButton from "./MultiButton/MultiButton";
function OtherProfile(props) {
    const { id } = useParams();
    // console.log(id);
    //const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`/api/userprofile/${id}`)
            .then((res) => res.json())
            .then((response) => {
                // console.log("response", response);
                if (response.success) {
                    //console.log("other profile respone.user", response.user);
                    setUser(response.user);
                } else {
                    //"success false"
                }
            });
    }, []);

    return (
        <div>
            <p>{`${user.first_name} ${user.last_name}`}</p>
            <div>
                <img
                    src={`${user.profilepic_url || "/default_usericon_1.png"}`}
                    alt=""
                />
                <p>{`${user.bio || "no bio yet"}`}</p>
                <MultiButton />
            </div>
        </div>
    );
}
export default OtherProfile;

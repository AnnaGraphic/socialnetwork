import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function OtherProfile(props) {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`/user/${id}`)
            .then((res) => res.json())
            .then((response) => {
                console.log("response", response);
                if (response.success) {
                    console.log("other profile respone.user", response.user);
                    setUser(response.user);
                } else {
                    //"success false"
                }
            });
    });

    return (
        <div>
            <p>{`${user.first_name} ${user.last_name}`}</p>
            <div>
                <img
                    src={`${user.profilepic_url || "/default_usericon_1.png"}`}
                    alt=""
                />
                <p>{`${user.bio || "no bio yet"}`}</p>
            </div>
        </div>
    );
}
export default OtherProfile;
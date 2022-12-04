import ProfilePic from "./ProfilePic";
import Bio from "./Bio";
function Profile(props) {
    return (
        <div>
            <p>profile</p>
            <div>
                <ProfilePic
                    clickHandler={props.clickHandler}
                    user={props.user}
                />
                <Bio user={props.user} />
            </div>
        </div>
    );
}
export default Profile;

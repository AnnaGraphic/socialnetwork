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
                    size="large"
                />
                <div className="bio">
                    <Bio user={props.user} bioUpdate={props.bioUpdate} />
                </div>
            </div>
        </div>
    );
}
export default Profile;

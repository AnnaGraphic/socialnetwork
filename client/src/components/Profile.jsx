import ProfilePic from "./ProfilePic";
function Profile(props) {
    return (
        <div>
            <p>profile</p>
            <div>
                <ProfilePic
                    clickHandler={props.clickHandler}
                    user={props.user}
                />
            </div>
        </div>
    );
}
export default Profile;

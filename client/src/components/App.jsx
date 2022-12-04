import { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Upload from "./Upload.jsx";
import Profile from "./Profile.jsx";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderVisible: false,
            currentUser: null,
        };
        // why bind?
        this.openUploader = this.openUploader.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
    }
    // +++ methods +++
    openUploader() {
        console.log("openUploader");
        this.setState({ isUploaderVisible: true });
    }
    closeUploader() {
        this.setState({ isUploaderVisible: false });
    }

    profilePicUploaded(url) {
        //console.log("profilePic", url);
        this.setState(
            {
                currentUser: {
                    ...this.state.currentUser,
                    profilepic_url: url,
                },
            },
            () => {
                console.log(this.state);
                this.closeUploader();
            }
        );
    }

    componentDidMount() {
        fetch("/user")
            .then((res) => res.json())
            .then((user) => {
                console.log("user", user);
                this.setState({
                    currentUser: user,
                });
            });
    }

    render() {
        return (
            <div className="App">
                <div className="navbar">
                    <Logo /> <h1> 🔥 🌟 💔 Panda inter pares 🦞 ✨ 💔</h1>
                    <ProfilePic
                        clickHandler={this.openUploader}
                        user={this.state.currentUser}
                    ></ProfilePic>
                </div>
                <Profile
                    clickHandler={this.openUploader}
                    user={this.state.currentUser}
                ></Profile>

                {this.state.isUploaderVisible && (
                    <Upload
                        handleSuccess={(url) => this.profilePicUploaded(url)}
                        user={this.state.currentUser}
                    />
                )}
            </div>
        );
    }
}

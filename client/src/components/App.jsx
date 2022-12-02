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
        this.setState(
            {
                userData: {
                    ...this.state.userData,
                    profilePicUrl: url,
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
                //   console.log("user", user);
                this.setState({
                    currentUser: user,
                });
            });
    }

    render() {
        return (
            <div className="App">
                <header>
                    <Logo /> <h1> 🔥 🌟 💔 Panda inter pares 🦞 ✨ 💔</h1>
                </header>
                <Profile></Profile>
                <ProfilePic
                    clickHandler={this.openUploader}
                    user={this.state.currentUser}
                />

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

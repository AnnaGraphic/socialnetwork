import { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Upload from "./Upload.jsx";

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
                    <Logo /> <h1> 🐼 🔥 🌟 💔 PandaUnsozial 🐼 🦞 ✨ 💔</h1>
                    {/* hier definiere ich die properties fuer die komponente */}
                </header>
                <ProfilePic
                    clickHandler={this.openUploader}
                    user={this.state.currentUser}
                />
                {this.state.isUploaderVisible && (
                    <Upload
                        clickHandler={this.closeUploader}
                        user={this.state.currentUser}
                    />
                )}
            </div>
        );
    }
}

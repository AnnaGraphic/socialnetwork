import { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isUploaderVisible: false,
            currentUser: null,
        };
        // why bind?
        // this.openUploader = this.openUploader.bind(this);
    }
    // +++ methods +++
    openUploader() {
        this.setState({ isUploderVisible: true });
    }

    //closing function closeUploader

    componentDidMount(prevProps) {
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
                <Logo />
                {/* hier definiere ich die propertys fuer die komponente */}
                <ProfilePic user={this.state.currentUser} />
            </div>
        );
        // uploader closeUploader={}
    }
}

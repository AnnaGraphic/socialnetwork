import { Component } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";
import Upload from "./Upload.jsx";
import Profile from "./Profile.jsx";
import FindPandas from "./FindPandas.jsx";
import OtherProfile from "./OtherProfile";
import Contacts from "./Contacts/Contacts";
import Chat from "./Chat/Chat";
import Logout from "./Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        //console.log("openUploader");
        this.setState({ isUploaderVisible: true });
    }
    closeUploader() {
        this.setState({ isUploaderVisible: false });
    }

    bioUpdate(bio) {
        //console.log("bio uppdate", bio);
        this.setState({
            currentUser: {
                ...this.state.currentUser,
                bio: bio,
            },
        });
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
                <BrowserRouter>
                    <div className="navbar">
                        <Logo /> <h1> 🔥 🌟 💔 Panda inter pares 🦞 ✨ 💔</h1>
                        <Link to="/users">find pandas</Link>
                        <Link to="/chat">chat</Link>
                        <Link to="/contacts">contacts</Link>
                        <ProfilePic
                            clickHandler={this.openUploader}
                            user={this.state.currentUser}
                        ></ProfilePic>
                        <Logout />
                    </div>

                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <Profile
                                    clickHandler={this.openUploader}
                                    user={this.state.currentUser}
                                    bioUpdate={(bio) => this.bioUpdate(bio)}
                                ></Profile>
                            }
                        ></Route>
                        <Route path="/chat" element={<Chat></Chat>}></Route>
                        <Route
                            path="/users"
                            element={<FindPandas></FindPandas>}
                        ></Route>
                        <Route
                            path="/userprofile/:id"
                            element={<OtherProfile></OtherProfile>}
                            //needs id to check if its the own profile
                            user={this.state.currentUser}
                        ></Route>
                        <Route path="/contacts" element={<Contacts />}></Route>
                    </Routes>
                </BrowserRouter>

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

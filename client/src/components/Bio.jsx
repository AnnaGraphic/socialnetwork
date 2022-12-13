import { Component } from "react";
import SubmitButton from "./SubmitButton";
export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
        this.editBio = this.editBio.bind(this);
        // this.editBio = () => this.editBio();
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    // +++ methods +++
    editBio() {
        this.setState({ editing: true });
    }
    handleInputChange(e) {
        //console.log(e);
        const text = e.currentTarget.value;
        this.setState({
            [e.currentTarget.name]: text,
        });
    }

    render() {
        const bio = this.props.user?.bio || "";
        return (
            <div>
                <p>vita</p>
                <div>
                    {!this.state.editing && (
                        <div>
                            <div className="biotext">{bio}</div>
                            <button onClick={this.editBio}>bene vita</button>
                        </div>
                    )}
                    {this.state.editing && (
                        <div>
                            <input
                                type="text"
                                name="inputBio"
                                onChange={this.handleInputChange}
                                placeholder="adde vita"
                            ></input>
                            <SubmitButton
                                route="/editbio"
                                payload={{ inputBio: this.state.inputBio }}
                                onSuccess={() => {
                                    this.setState({ editing: false });
                                    this.props.bioUpdate(this.state.inputBio);
                                }}
                                onError={() => {}}
                                text="servo"
                            ></SubmitButton>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

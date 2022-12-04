import { Component } from "react";
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

    handleSubmit() {
        console.log("bio handle submit", this.state.inputBio);
        fetch("/editbio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputBio: this.state.inputBio }),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("response handle submit", response);
                if (response.success) {
                    //"success true"
                    this.setState({ editing: false });
                    //
                    this.props.bioUpdate(this.state.inputBio);
                } else {
                    console.log("response handle submit 2", response);
                }
            })
            .catch((err) => {
                console.log("bio", err);
            });
    }

    render() {
        const bio = this.props.user?.bio || "";
        return (
            <div>
                <p>bio</p>
                <div>
                    {!this.state.editing && (
                        <div>
                            <div className="biotext">{bio}</div>
                            <button onClick={this.editBio}>edit bio</button>
                        </div>
                    )}
                    {this.state.editing && (
                        <div>
                            <input
                                type="text"
                                name="inputBio"
                                onChange={this.handleInputChange}
                                placeholder="add a bio"
                            ></input>
                            <button onClick={(e) => this.handleSubmit(e)}>
                                save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

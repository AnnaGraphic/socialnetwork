import { Component } from "react";

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // +++ methods +++
    handleSubmit(e) {
        e.preventDefault();
        console.log("logout");
        fetch("/logout").then(location.replace("/"));
    }

    render() {
        return (
            <div>
                <div id="fakebutton" onClick={this.handleSubmit}>
                    logout
                </div>
            </div>
        );
    }
}

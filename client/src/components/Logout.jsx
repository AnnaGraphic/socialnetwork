import { Component } from "react";

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
    }

    // +++ methods +++
    handleSubmit() {
        console.log("logout");
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("response logout", response);
                // if (response.success) {
                //     "success true"
                //     location.reload();
                // } else {
                //     console.log("response logout 2", response);
                //     "success false"
                //     this.setState({ error: "something went wrong" });
                //     update state to make error appear, also for catch
                // }
            });
    }

    render() {
        return (
            <div>
                <button onClick={(e) => this.handleSubmit(e)}>logout</button>
            </div>
        );
    }
}

import { Component } from "react";

import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    // +++ methods +++
    handleInputChange(e) {
        console.log(e);
        const text = e.currentTarget.value;
        this.setState({
            [e.currentTarget.name]: text,
        });
    }

    handleSubmit() {
        //console.log("About to submit the form!");
        //console.log(this.state);
        fetch("/register", {
            method: "POST",
            // to send json body in a post, headers is required
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("response handle submit", response);
                if (response.success) {
                    //"success true"
                    location.reload();
                } else {
                    console.log("response handle submit 2", response);
                    //"success false"
                    this.setState({ error: "plz fill in correctly" });
                    //update state to make error appear, also for catch
                }
            })
            .catch((err) => {
                console.log("registration", err.message);
            });
    }

    render() {
        return (
            <div>
                <h1>Register here</h1>

                <p>and join the network of latin speaking pandas</p>
                <div className="error">{this.state.error}</div>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        onChange={this.handleInputChange}
                        placeholder="First name"
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        onChange={this.handleInputChange}
                        placeholder="Last name"
                    ></input>
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        onChange={this.handleInputChange}
                        placeholder="Email"
                    ></input>
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                        placeholder="Password"
                    ></input>
                </div>
                <div>
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Register Now
                    </button>
                </div>
                <div>
                    <p>
                        already registered? then&nbsp;
                        <Link to="/login">login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

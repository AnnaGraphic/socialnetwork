import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    //constructor wird immer aufgerufen, wenn du eine Instanz deiner Klasse kreirst

    constructor(props) {
        // ruft constructor von Elternklasse Component auf
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
        console.log("About to submit the login-form!");
        console.log(this.state);
        fetch("/login", {
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
            });
    }

    render() {
        return (
            <div>
                <h1>🌈 This is the Login component 🌈</h1>
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
                        log in
                    </button>
                </div>
                <p>
                    forgot password&nbsp;
                    <Link to="/resetpassword">reset password</Link>
                </p>
            </div>
        );
    }
}

import { Component } from "react";
import { Link } from "react-router-dom";
export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            display: null,
        };
    }
    // +++ methods +++
    //change display
    handleInputChange(e) {
        console.log(e);
        const text = e.currentTarget.value;
        this.setState({
            [e.currentTarget.name]: text,
        });
    }

    render() {
        return (
            <div>
                <p>reset password</p>
                <form>
                    <div>
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleInputChange}
                            placeholder="Email"
                        ></input>
                    </div>
                    <div>
                        <p>submit for next steps</p>
                        <button onClick={(e) => this.handleSubmit(e)}>
                            submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

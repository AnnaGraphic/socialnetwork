import { Component } from "react";
// import { Link } from "react-router-dom";

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            display: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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

    // Display(this.props) {
    //     // wo render?, wo return?
    //     switch (this.props.display) {
    //         case (this.props.display = null):
    //             return (<div></div>),
    //             break;
    //         case (this.props.display = "2nd stepp"):
    //             return (?),
    //             break;
    //         case (this.props.display = 3rd stepp):
    //             return (<div></div>),
    //             break;
    //         default:
    //         return (<div> WAS HIER? </div>),
    //     }

    // }

    handleSubmit() {
        console.log("submit the reset pwd form with this.state", this.state);
        fetch("/resetpassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("ResetWassword handle submit response", response);
                if (response.success) {
                    //what to do?
                    this.setState({ display: "2nd step" });
                    // needed when setState? -> location.reload();
                } else {
                    console.log(
                        "Resetpassword handle submit2 response",
                        response
                    );
                    this.setState({ error: "email not found", display: null });
                }
            });
    }

    render() {
        return (
            <div>
                <p>reset password</p>
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
                    <br />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        submit
                    </button>
                </div>
            </div>
        );
    }
}

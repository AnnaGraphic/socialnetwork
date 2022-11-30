import { Component } from "react";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    // +++ methods +++
    render() {
        const profilepic =
            this.props.user?.profilepic || "/default_usericon_1.png";
        return (
            <div>
                {this.props.user && (
                    <img
                        src={profilepic}
                        alt={`${this.props.user.first_name} ${this.props.user.last_name}`}
                    />
                )}
            </div>
        );
    }
}

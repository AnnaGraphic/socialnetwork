import { Component } from "react";

export default class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    // +++ methods +++

    render() {
        const profilepic =
            this.props.user?.profilepic_url || "/default_usericon_1.png";
        return (
            <div>
                {this.props.user && (
                    <img
                        className="profilePic"
                        onClick={this.props.clickHandler}
                        //when click then update state
                        src={profilepic}
                        alt={`${this.props.user.first_name} ${this.props.user.last_name}`}
                    />
                )}
                {/* if truthy than render  */}
                {this.props.user && (
                    <p>
                        {this.props.user.first_name} {this.props.user.last_name}
                    </p>
                )}
            </div>
        );
    }
}

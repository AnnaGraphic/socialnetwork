import { Component } from "react";
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isUploaderVisible: false,
        };
        // why bind?
        // this.openUploader = this.openUploader.bind(this);
    }
    // +++ methods +++
    openUploader() {
        this.setState({ isUploderVisible: true });
    }

    //closing function closeUploader

    componentDidMount() {
        //make get request
    }

    render() {
        //fragment tag
        return <>Logo</>;
        // profile pic
        //uploader closeUploader={}
    }
}

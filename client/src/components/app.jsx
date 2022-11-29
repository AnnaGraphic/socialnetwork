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

    openUploader() {
        this.setState({ isUploderVisible: true });
    }

    //closiing function closeUploader

    render() {
        //fragment tag
        return <>Logo</>;
        // profile pic
        //uploader closeUploader={}
    }
}

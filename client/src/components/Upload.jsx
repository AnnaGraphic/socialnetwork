function ImageUploader(props) {
    function uploadImage() {
        //use FormData API to send file to the server
        const file = document.querySelector("input[type=file]").files[0];
        console.log(file);

        const formData = new FormData(); //create FormData instance and append file to it
        formData.append("file", file);

        fetch("/profilepic", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                this.setState(
                    {
                        userData: {
                            ...this.state.userData,
                            profilePicUrl: result.url,
                        },
                    },
                    () => {
                        console.log(this.state);
                    }
                );
                // hier modal schliessen? this.closeUploader();
            });
    }
    return (
        <div className="modal">
            <div className="modalContainer">
                <h1>🌈 upload your profile pic! 🌈</h1>
                <div>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        name="profilePic"
                        placeholder="chose image ..."
                    ></input>
                </div>
                <div>
                    {/* <button onClick={props.clickHandler}>upload</button> */}
                    <button onClick={uploadImage}>upload</button>
                </div>
            </div>
        </div>
    );
}
export default ImageUploader;

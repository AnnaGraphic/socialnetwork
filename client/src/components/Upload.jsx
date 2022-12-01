function ImageUploader(props) {
    return (
        <div className="modal">
            <div className="modalContainer">
                <h1>🌈 This is the Upload component 🌈</h1>
                <div>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        name="profilePic"
                        placeholder="chose image ..."
                    ></input>
                </div>
                <div>
                    <button onClick={props.clickHandler}>upload</button>
                </div>
            </div>
        </div>
    );
}
export default ImageUploader;

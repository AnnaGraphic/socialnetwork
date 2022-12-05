function SubmitButton({ route, payload, onSuccess, onError, text }) {
    function handleSubmit({ route, payload, onSuccess, onError }) {
        //console.log("About to submit the form!");
        console.log(payload);
        fetch(route, {
            method: "POST",
            // to send json body in a post, headers is required
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((response) => {
                //console.log("response handle submit", response);
                if (response.success) {
                    //"success true"
                    onSuccess(response);
                } else {
                    console.log("SubmitButton err: ", response);
                    //"success false"
                    onError();
                }
            })
            .catch((err) => {
                console.log("SubmitButton err: ", err);
            });
    }
    return (
        <button
            onClick={() => handleSubmit({ route, payload, onSuccess, onError })}
        >
            {text}
        </button>
    );
}
export default SubmitButton;

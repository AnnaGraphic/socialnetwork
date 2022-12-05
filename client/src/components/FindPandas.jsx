import SubmitButton from "./SubmitButton";
import { useState } from "react";
function FindPandas(props) {
    const [search, setSearch] = useState("");
    console.log("Search ", search);
    return (
        <div>
            <p>find pandas</p>
            <input
                type="text"
                name="searchPanda"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search panda ..."
            ></input>
            <SubmitButton
                route="/searchpanda"
                payload={{ searchPanda: search }}
                onSuccess={() => {
                    console.log("find pandas");
                }}
                onError={() => {}}
                text="search"
            ></SubmitButton>
        </div>
    );
}
export default FindPandas;

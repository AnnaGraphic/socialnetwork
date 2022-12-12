//import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function FindPandas(props) {
    const [search, setSearch] = useState("");
    const [pandas, setPandas] = useState([]);
    // console.log("Search ", search);

    useEffect(() => {
        fetch(`/searchpanda/${search}`)
            .then((res) => res.json())
            .then((response) => {
                if (response) {
                    //console.log("users on findPandas.jsx", response);
                    //"success true"
                    setPandas([...response.users]);
                } else {
                    //"success false"
                }
            });
    }, []);

    return (
        <div>
            <p>find pandas</p>
            <input
                type="text"
                name="searchPanda"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search panda ..."
            ></input>

            {/* 
                <SubmitButton
                route="/searchpanda"
                payload={{ searchPanda: search }}
                onSuccess={() => {
                    console.log("find pandas");
                    //render results
                }}
                onError={() => {}}
                text="search"
            ></SubmitButton> */}

            <div className="searchresults">
                <ul>
                    {pandas.map((panda) => {
                        return (
                            <li key={panda.id}>
                                <h5>{`${panda.first_name} ${panda.last_name}`}</h5>
                                <div className="profilePic">
                                    <Link to={`/userprofile/${panda.id}`}>
                                        <img
                                            src={
                                                panda.profilepic_url ||
                                                "/default_usericon_1.png"
                                            }
                                            alt={`${panda.first_name} ${panda.last_name}`}
                                        />
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
export default FindPandas;

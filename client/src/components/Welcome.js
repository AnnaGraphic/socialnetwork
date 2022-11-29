// import and create registration
// hier alle roots rein, die der user sieht bevor er angemeldet ist
//import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";

export default function Welcome() {
    return (
        <div id="welcome">
            <img id="logo" src="/logo.png" />
            <h1>Welcome!</h1>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Registration />}
                        ></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

// export default class Welcome extends Component {
//     render() {
//         return (
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/about" element={<About />}></Route>
//                 </Routes>
//             </BrowserRouter>
//         );
//     }
// }

// import and create registration
// hier alle roots rein, die der user sieht bevor er angemeldet ist
//import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logo from "./Logo";

export default function Welcome() {
    return (
        <div id="welcome">
            <header>
                <Logo /> <h1> 🔥 🌟 💔 Panda inter pares 🦞 ✨ 💔</h1>
            </header>

            <div className="welcomeCard">
                <h1>Welcome!</h1>
                <BrowserRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Registration />}
                        ></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route
                            path="/resetpassword"
                            element={<ResetPassword />}
                        ></Route>
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

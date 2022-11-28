// needs state?
// import and create registration
// hier alle roots rein, die der user sieht bevor er angemeldet ist
//import React, { Component } from "react";
import Registration from "./Registration";
//import { BrowserRouter } from "react-router-dom";

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

export default function Welcome() {
    return <Registration />;
}

import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";
import Auth from "./context/loginContext.js";
import Game from "./context/gameContext.js";

ReactDOM.render(
    <React.StrictMode>
        <Auth>
            <Game>
                <App />
            </Game>
        </Auth>
    </React.StrictMode>,
    document.getElementById("root")
);

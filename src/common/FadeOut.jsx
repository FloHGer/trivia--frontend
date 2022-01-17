import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./../sass/common/FadeOut.module.scss";

function FadeOut() {
    const navigate = useNavigate();

    return (
        <div className={classes.fadeOut} onClick={() => navigate("/")}></div>
    );
}

export default FadeOut;

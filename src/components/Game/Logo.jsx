import React from "react";

import Square from "../common/Square";
import classes from "./Logo.module.scss";

function LogoTrivia() {
    return (
        <div className={classes.container}>
            <Square className={classes.logo} />
            <p className={classes.logo__title}>
                <span className={classes.logo__span}>T</span>rivia
            </p>
            <div className={classes.logo__line}></div>
            <div className={classes.logo__diamond}></div>
        </div>
    );
}

export default LogoTrivia;

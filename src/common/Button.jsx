import React from "react";

import classes from "./../sass/common/Button.module.scss";

function Button(props) {
    return (
        <button
            className={`${classes.btn} ${props.className}`}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
            type={props.type}
        >
            {props.title1}
            {props.title2}
        </button>
    );
}

export default Button;

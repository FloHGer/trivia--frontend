import { useNavigate } from "react-router-dom";

import classes from "./FadeOut.module.scss";


export default function FadeOut({onClick}) {
    const navigate = useNavigate();

    return (
        <div className={classes.fadeOut} onClick={onClick || navigate("/")}></div>
    );
}


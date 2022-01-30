import { useAuth } from "./../../context/loginContext";
import { useState } from "react";

import classes from "./../../sass/components/Game/TriviaStatsBar.module.scss";

function TriviaStatsBar() {
    const [title, setTitle] = useState(
        "Your points will not be saved in ranking. You need to be logged in!"
    );

    const [isLoggedIn] = useAuth(false);

    return <div className={classes.bar}>{title}</div>;
}

export default TriviaStatsBar;

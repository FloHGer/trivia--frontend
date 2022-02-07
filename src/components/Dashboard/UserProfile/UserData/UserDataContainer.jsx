import React from "react";
import { useState } from "react";

// import Achievements from "./../../../pages/Achievements";

import classes from "./UserDataContainer.module.scss";
import Ranks from "./Ranks.jsx";
import Stats from "./Stats.jsx";
import Achievs from "./Achievs.jsx";

function CardUserProfileStats() {
    const [isActive, setIsActive] = useState("ranks");

    return (
        <section className={classes.profile__stats}>
            <div className={classes["profile__stats--titles"]}>
                <p
                    onClick={() => setIsActive("ranks")}
                    className={
                        isActive === "ranks"
                            ? classes.active
                            : classes["profile__stats--paragraph"]
                    }
                >
                    {'Ranking'}
                </p>
                <p
                    onClick={() => setIsActive("stats")}
                    className={
                        isActive === "stats"
                            ? classes.active
                            : classes["profile__stats--paragraph"]
                    }
                >
                    {'Statistics'}
                </p>
                <p
                    onClick={() => setIsActive("achievs")}
                    className={
                        isActive === "achievs"
                            ? classes.active
                            : classes["profile__stats--paragraph"]
                    }
                >
                    {'Achievements'}
                </p>
            </div>
            <div className={classes["profile__stats--data"]}>
                {isActive === "ranks" && <Ranks />}
                {isActive === "stats" && <Stats />}
                {isActive === "achievs" && <Achievs />}
            </div>
        </section>
    );
}

export default CardUserProfileStats;

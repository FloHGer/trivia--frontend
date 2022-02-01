import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../../../../context/loginContext";
import Card from "../../../common/Card";

import classes from "./../../../../sass/components/UserProfile/Card/Data/Stats.module.scss";


function Stats() {
    const [currentUser] = useAuth();
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND}/user/${currentUser}/stats`
            );
            console.log(response.data);
            if (response.data.message === "success")
                setData(response.data.payload);
        })();
    }, [currentUser]);

    return (
        <div className={classes.stats}>
            <div className={classes.dataCard}>
                <h2 className={classes.stats__title}>Games played</h2>
                <p className={classes.stats__data}>
                    {data && data.gamesPlayed}
                </p>
            </div>
            <div className={classes.stats__together}>
                <div className={classes["stats__together--item"]}>
                    <div className={classes.dataCard}>
                        <h2 className={classes.stats__title}>Total score</h2>
                        <p className={classes.stats__data}>
                            {data && data.score.total}
                        </p>
                    </div>
                </div>
                <div className={classes["stats__together--item"]}>
                    <div className={classes.dataCard}>
                        <h2 className={classes.stats__title}>Highscore</h2>
                        <p className={classes.stats__data}>
                            {data && data.score.high}
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.stats__together}>
                <div className={classes["stats__together--item"]}>
                    <div className={classes.dataCard}>
                        <h2 className={classes.stats__title}>
                            Questions answered
                        </h2>
                        <p className={classes.stats__data}>
                            {data && data.answers.total}
                        </p>
                    </div>
                </div>
                <div className={classes["stats__together--item"]}>
                    <div className={classes.dataCard}>
                        <h2 className={classes.stats__title}>
                            Correct answers
                        </h2>
                        <p className={classes.stats__data}>
                            {data && data.answers.correct}
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.dataCard}>
                <h2 className={classes.stats__title}>Categories completed</h2>
                <p className={classes.stats__data}>
                    {data && data.completedCategories.total}
                </p>
            </div>
            <div className={classes.dataCard}>
                <h2 className={classes.stats__title}>
                    Max completed categories in one game
                </h2>
                <p className={classes.stats__data}>
                    {data && data.completedCategories.max}
                </p>
            </div>
        </div>
    );
}
export default Stats;

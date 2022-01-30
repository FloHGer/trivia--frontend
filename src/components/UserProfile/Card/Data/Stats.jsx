import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../../../../context/loginContext";
import classes from "./../../../../sass/components/UserProfile/Card/Data/Stats.module.scss";
import DataCard from "./DataCard";

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
            <DataCard>
                <h2 className={classes.stats__title}>Games played</h2>
                <p className={classes.stats__data}>
                    {" "}
                    {data && data.gamesPlayed}{" "}
                </p>
            </DataCard>
            <div className={classes.stats__together}>
                <div className={classes["stats__together--item"]}>
                    <DataCard>
                        <h2 className={classes.stats__title}>Total score</h2>
                        <p className={classes.stats__data}>
                            {" "}
                            {data && data.score.total}
                        </p>
                    </DataCard>
                </div>
                <div className={classes["stats__together--item"]}>
                    <DataCard>
                        <h2 className={classes.stats__title}>Highscore</h2>{" "}
                        <p className={classes.stats__data}>
                            {data && data.score.high}
                        </p>
                    </DataCard>
                </div>
            </div>
            <div className={classes.stats__together}>
                <div className={classes["stats__together--item"]}>
                    <DataCard>
                        <h2 className={classes.stats__title}>
                            Questions answered
                        </h2>{" "}
                        <p className={classes.stats__data}>
                            {data && data.answers.total}
                        </p>
                    </DataCard>
                </div>
                <div className={classes["stats__together--item"]}>
                    <DataCard>
                        <h2 className={classes.stats__title}>
                            Correct answers
                        </h2>{" "}
                        <p className={classes.stats__data}>
                            {data && data.answers.correct}
                        </p>
                    </DataCard>
                </div>
            </div>
            <DataCard>
                <h2 className={classes.stats__title}>Categories completed</h2>
                <p className={classes.stats__data}>
                    {data && data.completedCategories.total}
                </p>
            </DataCard>
            <DataCard>
                <h2 className={classes.stats__title}>
                    Max completed categories in one game{" "}
                </h2>
                <p className={classes.stats__data}>
                    {data && data.completedCategories.max}
                </p>
            </DataCard>
        </div>
    );
}
export default Stats;

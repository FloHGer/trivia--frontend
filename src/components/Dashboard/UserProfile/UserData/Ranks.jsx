import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./../../../../sass/components/UserProfile/Card/Data/Ranks.module.scss";

function Ranks() {
    const [data, setData] = useState();
    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND}/ranks/highscore`
            );
            if (response.data.message === "success")
                setData(response.data.payload);
        })();
    }, []);
    return (
        <>
            <table className={classes.table}>
                <thead className={classes.table__head}>
                    <tr>
                        <th className={classes["table__head--title"]}>Rank</th>
                        <th className={classes["table__head--title"]}>Name</th>
                        <th className={classes["table__head--title"]}>
                            High Score
                        </th>
                    </tr>
                </thead>
                <tbody className={classes.table__body}>
                    {data &&
                        data.map((elem, i) => {
                            return (
                                <tr
                                    className={classes["table__body--item"]}
                                    key={i}
                                >
                                    <th
                                        className={classes["table__body--rank"]}
                                    >
                                        {i + 1}
                                    </th>
                                    <td>{elem.username}</td>
                                    <td>{elem.value}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}
export default Ranks;

import React from "react";

import Square from "../../../common/Square";

import classes from "./AchievCard.module.scss";

export default function AchievCard({ data, title, text, values }) {
    return (
        <div className={data.unlocked.length ? classes.card__unlocked : classes.card}>
            <div className={classes.left}>
                <Square
                    title={'trophy'}
                    level={data.unlocked.length / values.length}
                    size={'10rem'}
                />
                <div className={classes.left__date}>
                    {(data.unlocked.length && (
                        <p>{data.unlocked[data.unlocked.length - 1]}</p>
                    )) ||
                        ""}
                </div>
            </div>
            <div className={classes.card__data}>
                <div className={classes.card__text}>
                    <h2 className={classes["card__data--title"]}>{title}</h2>
                    <h3 className={classes["card__data--condition"]}>
                        {text[0]}
                        {data.unlocked.length === values.length
                            ? values[values.length - 1]
                            : values[data.unlocked.length]}
                        {text[1]}
                    </h3>

                    {data.unlocked.length < values.length && (
                        <h4 className={classes["card__data--todo"]}>
                            <div
                                className={classes.card__progression}
                                style={{
                                    width: values.length === 6 ? 0
                                    : `${
                                        ((values[data.unlocked.length] -
                                            data.next) *
                                            100) /
                                        values[data.unlocked.length]
                                    }%`,
                                }}
                            ></div>
                            {!data.unlocked.length && values.length === 6
                                ? 0
                                : values[data.unlocked.length] - data.next}{" "}
                            / {values[data.unlocked.length]}
                        </h4>
                    )}
                </div>
            </div>
        </div>
    );
}

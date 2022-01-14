import React from "react";
import { Link } from "react-router-dom";

import { FaTimesCircle } from "react-icons/fa";
import FadeOut from "../common/FadeOut";
import Card from "../common/Card";
import Button from "./../common/Button";

import classes from "./../sass/pages/Warning.module.scss";
import styles from "./../sass/common/Button.module.scss";
import cn from "classnames";

function Warning() {
    return (
        <div className={classes.warning}>
            <Card>
                <Link to="/">
                    <FaTimesCircle className={classes.warning__icon} />
                </Link>
                <div className={classes.warning__text}>
                    <h2 className="heading heading__2">
                        <span className={classes["warning__span--red"]}>
                            WARNING! ACHTUNG! UWAGA!
                        </span>
                    </h2>
                    <h3 className="heading heading__3">
                        This is just a{" "}
                        <span className={classes["warning__span--red"]}>
                            quickgame mode
                        </span>
                        .{" "}
                    </h3>
                    <h3 className="heading heading__3">
                        Most of the options are not available and what is worse:
                    </h3>
                    <h3 className="heading heading__3">
                        {" "}
                        <span
                            className={`${classes["warning__span--red"]} ${classes.warning__span}`}
                        >
                            no ranking
                        </span>
                    </h3>

                    <h3 className="heading heading__3">
                        {" "}
                        <span
                            className={`${classes["warning__span--red"]} ${classes.warning__span}`}
                        >
                            no achievements
                        </span>
                    </h3>
                    <h3 className="heading heading__3">
                        {" "}
                        <span className={classes["warning__span--gold"]}>
                            no glory
                        </span>
                    </h3>
                    <div className={classes.warning__buttons}>
                        <Link to="/quickgame">
                            <Button
                                className={styles.btn__blue}
                                type="submit"
                                title1="Play!"
                            />
                        </Link>
                        <p>OR</p>
                        <Link to="/login">
                            <Button type="submit" title2="Log in" />
                        </Link>
                    </div>
                </div>
            </Card>
            <FadeOut />
        </div>
    );
}

export default Warning;

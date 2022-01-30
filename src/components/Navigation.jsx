import React from "react";
import { Link } from "react-router-dom";

import classes from "./../sass/components/Navigation.module.scss";
import cn from "classnames";

function Navigation() {
    return (
        <div className={classes.navi}>
            <div className={classes.navigation}>
                <ul className={classes.navigation__list}>
                    <li className={classes["navigation__list--item"]}>
                        <div className="line line__1"></div>
                        <div className="diamond"></div>
                        <Link to="/games">
                            <h2
                                className={cn(
                                    classes["navigation__list--link"],
                                    "heading heading__2"
                                )}
                            >
                                {'Statistics'}
                            </h2>
                        </Link>
                    </li>
                    <li className={classes["navigation__list--item"]}>
                        <div className="line line__2"></div>
                        <div className="diamond"></div>
                        <Link to="/achievements">
                            <h2
                                className={cn(
                                    classes["navigation__list--link"],
                                    "heading heading__2"
                                )}
                            >
                                {'Rankings'}
                            </h2>
                        </Link>
                    </li>
                    <li className={classes["navigation__list--item"]}>
                        <div className="line line__3"></div>
                        <div className="diamond"></div>
                        <Link to="/stats">
                            <h2
                                className={cn(
                                    classes["navigation__list--link"],
                                    "heading heading__2"
                                )}
                            >
                                {'BLANK'}
                            </h2>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;

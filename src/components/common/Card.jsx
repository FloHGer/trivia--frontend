

import classes from "../../sass/common/Card.module.scss";

export default function Card({ classname, children }) {
    return <div className={classes.card}>{children}</div>;
}


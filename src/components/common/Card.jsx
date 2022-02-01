

import classes from "../../sass/common/Card.module.scss";

export default function Card(props) {
    return <div className={`${props.classname}` || `${classes.card}`}>
        {props.children}
    </div>;
}


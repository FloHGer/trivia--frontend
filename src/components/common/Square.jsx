

import classes from "../../sass/common/Square.module.scss";

export default function Square(props) {
    return (
        <div>
            <div className={props.className || classes.square}>
                {props.title && <h3 className="heading heading__3">{props.title}</h3>}
            </div>
        </div>
    );
}




import classes from "./Card.module.scss";

export default function Card(props) {
    return (
        <div
            className={props.className || classes.card}
            style={{
                maxWidth: props.maxWidth || '',
                fontSize: props.fontSize || '',
                background: props.background || '',
            }}        
        >
            {props.children}
        </div>
        );
}

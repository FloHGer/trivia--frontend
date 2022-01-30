
import Square from "./Square";
import { Link } from "react-router-dom";

import classes from "../../sass/common/Footer.module.scss";

export default function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.footer__rights}>
                <h4 className="heading heading__4">
                    All rights reserved | 2022 Berlin
                </h4>
            </div>

            <div className={classes.footer__nav}>
                <Link to="/">
                    <h4 className="heading heading__4">Home</h4>
                </Link>
                <h4 className="heading heading__4">Feedback</h4>
            </div>

            <div className={classes.footer__squares}>
                <Link to="/about">
                    <Square title="About us" />{" "}
                </Link>
            </div>
        </footer>
    );
}

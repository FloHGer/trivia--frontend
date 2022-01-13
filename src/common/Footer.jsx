import React from "react";

import Square from "./Square";
import { Link } from "react-router-dom";

import classes from "./../sass/common/Footer.module.scss";

function Footer() {
    return (
        <footer className={classes.footer}>
            <h4 className="heading heading__4">
                All rights reserved | 2022 Berlin
            </h4>
            <div className={classes.footer__squares}>
                <Link to="/about">
                    <Square title="About us" />{" "}
                </Link>
            </div>
        </footer>
    );
}

export default Footer;

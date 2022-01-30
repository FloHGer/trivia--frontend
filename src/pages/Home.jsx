import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import Navigation from "../components/Navigation";
import Button from "../common/Button";

import classes from "./../sass/pages/Home.module.scss";
import styles from "./../sass/common/Button.module.scss";

export default function Home() {
    const [title1, setTitle1] = useState("Play!");
    const [title2, setTitle2] = useState("Log in");

    const titles = [
        ["Just messing around...", "Getting serious, roar!"],
        ["Be sweet! Be cute!", "Be aggressive!"],
        ["Flower power", "Kill them all!"],
        ["Everyone's a winner", "The one and only!"],
        ["Relax, take it easy!", "Under pressure"],
        ["Look at the top", "Be on the top!"],
    ];

    const mouseEnterHandlerLeft = () => {
        setTitle1(titles[Math.floor(Math.random() * 6)][0]);
    };
    const mouseEnterHandlerRight = () => {
        setTitle2(titles[Math.floor(Math.random() * 6)][1]);
    };

    const mouseLeaveHandlerLeft = () => {
        setTitle1("Play!");
    };
    const mouseLeaveHandlerRight = () => {
        setTitle2("Log In");
    };

    return (
        <div>
            <Navigation />
            <div className={classes.container}>
                <h1 className="heading heading__1">
                    {'Did you come to drop some knowledge?'}
                </h1>

                <div className={classes.container__buttons}>
                    <Link to="/warning">
                        <Button
                            className={styles.btn__blue}
                            type="submit"
                            onMouseEnter={mouseEnterHandlerLeft}
                            onMouseLeave={mouseLeaveHandlerLeft}
                            title1={title1}
                        />
                    </Link>
                    <Link to="/login">
                        <Button
                            onMouseEnter={mouseEnterHandlerRight}
                            onMouseLeave={mouseLeaveHandlerRight}
                            type="submit"
                            title2={title2}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}


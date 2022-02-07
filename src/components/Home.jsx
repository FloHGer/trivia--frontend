import { useState } from "react";
import { Link } from "react-router-dom";

// import Navigation from "../components/common/Navigation";
import Button from "../components/common/Button";
import Warning from '../components/common/Warning';

import classes from "./Home.module.scss";
import styles from "./common/Button.module.scss";

export default function Home() {
    const [warning, setWarning] = useState(false);
    const [title] = useState(Math.floor(Math.random() * 7));
    const [title1, setTitle1] = useState(0);
    const [title2, setTitle2] = useState(0);

    const titles = [
        ["drop some knowledge", "Play!", "Log in"],
        ["earn some knowledge", "Just messing around...", "Getting serious, roar!"],
        ["become the best", "Be sweet! Be cute!", "Be aggressive!"],
        ["battle the best", "Flower power", "Kill them all!"],
        ["surprise your friends", "Everyone's a winner", "The one and only!"],
        ["waste some time", "Relax, take it easy!", "Under pressure"],
        ["waste some time", "Look at the top", "Be on the top!"],
    ];


    return (
        <main>
            {warning && <Warning setWarning={setWarning} />}
            {!warning &&
            <div className={classes.container}>
                <h1 className="heading heading__1">
                    {`Did you come to ${titles[title][0]}?`}
                </h1>

                <div className={classes.container__buttons}>
                    <Button
                        className={styles.btn__blue}
                        type="submit"
                        onMouseEnter={() => setTitle1(Math.floor(Math.random() * 6 + 1))}
                        onMouseLeave={() => setTitle1(0)}
                        onClick={() => setWarning(true)}
                        title={titles[title1][1]}
                    />
                    <Link to="/login">
                        <Button
                            onMouseEnter={() => setTitle2(Math.floor(Math.random() * 6 + 1))}
                            onMouseLeave={() => setTitle2(0)}
                            type="submit"
                            title={titles[title2][2]}
                        />
                    </Link>
                </div>
            </div>}
        </main>
    );
}


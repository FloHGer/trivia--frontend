import { useState } from "react";
import { Link } from "react-router-dom";

import { FaGithub, FaGoogle, FaTimesCircle } from "react-icons/fa";
import FadeOut from "../common/FadeOut";
import Card from "../common/Card";

import classes from "./../sass/pages/LogIn.module.scss";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);

    /* Email verification */

    const updateInputHandler = (event) => {
        setBtnDisabled(true);

        if (
            event.target.value.match(
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
            )
        ) {
            setBtnDisabled(false);
        }

        setEmail(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Card>
                <Link to="/">
                    <FaTimesCircle className={classes.login__icon} />
                </Link>
                <div className={classes.login__text}>
                    <h3 className="heading heading__3">
                        You need to be logged in to play like A true warrior!
                    </h3>
                    <p className={classes.break}>
                        No worries, we will register you on the way
                    </p>
                </div>
                <form onSubmit={submitHandler}>
                    <label htmlFor="">Your email</label>
                    <input
                        type="text"
                        name="text"
                        value={email}
                        placeholder="Please, write your email"
                        onChange={updateInputHandler}
                    />
                    <Link to="/userprofile">
                        <button
                            type="submit"
                            className={classes.btn}
                            disabled={btnDisabled}
                        >
                            Log in
                        </button>{" "}
                    </Link>
                    <p className={classes.break}>OR</p>
                </form>
                <div className={classes.login__socials}>
                    <div className={classes["login__socials--google"]}>
                        <FaGoogle />
                    </div>
                    <div className={classes["login__socials--github"]}>
                        <FaGithub />
                    </div>
                </div>
            </Card>
            <FadeOut />
        </div>
    );
}

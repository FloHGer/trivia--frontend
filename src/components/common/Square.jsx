import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaTrophy } from "react-icons/fa";

import { useAuth } from "../../context/loginContext";

import classes from "./Square.module.scss";

export default function Square({
	children,
    title,
	answerState,
    color,
    size,
    onClick,
    disabled,
    level,
    button,
    ml,
}) {
    const [currentUser, setCurrentUser] = useAuth();
    const navigate = useNavigate();

    const logHandler = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND}/auth/logout`,
            { withCredentials: true }
        );
        if (res.data.message === "logged out") {
            setCurrentUser(null);
            navigate("/");
        }
    };

    return (
        <>
            {button && (
                <button
                    disabled={disabled}
                    className={`
					${classes.box}
					${title === "LogIn / LogOut" ? classes.logSquare : ""}
				`}
                    style={{ width: size, height: size }}
                    onClick={
                        onClick === "logout"
                            ? currentUser
                                ? logHandler
                                : () => navigate("/login")
                            : onClick
                    }
                >
                    <div
                        className={`
                            ${classes.square}
                            ${answerState ? classes[answerState] : classes[color]}
                            ${answerState === 'active' || !answerState ? classes.animation : null}
                        `}
                    >
                        {title === "LogIn / LogOut" ? (
                            currentUser ? (
                                <FaSignOutAlt
                                    className={classes.logout__icon}
                                />
                            ) : (
                                <FaSignInAlt className={classes.login__icon} />
                            )
                        ) : (
                            <h3 className="heading heading__3">{title}</h3>
                        )}
                    </div>
                </button>
            )}
            {!button && (
                <div
                    style={{ width: size, height: size }}
                    className={classes.box}
                >
                    <div className={`${classes.square} ${answerState ? classes[answerState] : classes[color]}`}>
                        {title === "trophy" && !level ? (
                            <FaTrophy className={classes.trophy} />
                        ) : title === "trophy" && level < 0.5 ? (
                            <FaTrophy className={classes.trophy__bronze} />
                        ) : title === "trophy" && level < 1 ? (
                            <FaTrophy className={classes.trophy__silver} />
                        ) : title === "trophy" && level === 1 ? (
                            <FaTrophy className={classes.trophy__gold} />
                        ) : (
                            <h3 className="heading heading__3">{title}</h3>
                        )}
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import FileUpload from "./FileUpload";
import { validation } from "../../../../common/inputValidation.js";
import { flags } from "../../../../common/flags.js";
import { useAuth } from "../../../../context/loginContext.js";
import FeedbackCard from "../../../common/FeedbackCard";
import DeleteUser from "./DeleteUser";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import classes from "./UserInfoCard.module.scss";

export default function UserInfoCard() {
    const [currentUser, setCurrentUser] = useAuth();
    const [response, setResponse] = useState(null);
    const [data, setData] = useState();
    const [nat, setNat] = useState();
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState();
    const [flagsModal, setFlagsModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState();

    useEffect(() => {
        setEdit(false);
    }, []);

    useEffect(() => {
        (async () => {
            const response = (
                await axios.get(
                    `${process.env.REACT_APP_BACKEND}/user/${currentUser}`
                )
            ).data;
            if (response.message === "success") {
                setData(response.payload);
                setUsername(response.payload.username);
                setEmail(
                    response.payload.email
                        ? response.payload.email
                        : "enter your email"
                );
                setImage(response.payload.img);
            }
        })();
    }, [currentUser, nat, imageModal]);

    const inputChangeHandler = ({ name, value }) => {
        name === "username" ? setUsername(value) : setEmail(value);
    };

    const flagChangeHandler = async (key) => {
        try {
            setFlagsModal(false);
            const update = (
                await axios.patch(
                    `${process.env.REACT_APP_BACKEND}/user/${currentUser}`,
                    { updates: { nat: key } }
                )
            ).data.message;
            if (update === "user updated") return setNat(data.nat);
        } catch (err) {}
    };

    const openFlagsHandler = (e) => {
        e.stopPropagation();
        setImageModal(false);
        setFlagsModal(!flagsModal);
    };

    const openImageUpload = (e) => {
        e.stopPropagation();
        setFlagsModal(false);
        setImageModal(!imageModal);
    };

    const modalHandler = () => {
        setOpenDeleteModal(true);
        setFlagsModal(false);
        setImageModal(false);
    };

    // enter on username
    const keyHandler = useCallback((e) => {
		if(e.keyCode === 13) document.getElementById('username').blur();
	}, []);

    useEffect(()=> {
		document.getElementById('username').addEventListener('keydown', keyHandler);
		return () => document.getElementById('username').removeEventListener("keydown", keyHandler); 
	},[keyHandler]);
// username focus
    const focusHandler = () => setUsernameFocus(true);

    useEffect(()=> {
		document.getElementById('username').addEventListener('focus', focusHandler);
		return () => document.getElementById('username').removeEventListener("focus", focusHandler);
	},[]);


    return (
        <section className={classes.profile__user}>
            {response && (
                <FeedbackCard
                    title={response[0]}
                    text={response[1]}
                    onClick={() => {
                        setResponse(null);
                        setUsernameFocus(false);
                    }}
                />
            )}
            {/* PIC */}
            <div className={classes["profile__user--piccontainer"]}>
                <img
                    key={Date.now()}
                    title={edit
                            ? 'click to change profile image'
                        : 'your profile data is locked - please unlock it first'
                    }
                    src={image || ""}
                    alt={currentUser}
                    referrerPolicy="no-referrer"
                    className={classes["profile__user--pic"]}
                    style={{
                        cursor: edit ? "pointer" : "default",
                        pointerEvents: edit ? "auto" : "none",
                    }}
                    onClick={(e) => openImageUpload(e)}
                />
                {imageModal && (
                    <FileUpload
                        setImage={setImage}
                        setImageModal={setImageModal}
                    />
                )}

                {/* FLAGS */}
                <div
                    title={edit
                            ? 'click to change nationality'
                        : 'your profile data is locked - please unlock it first'
                    }
                    className={classes["profile__user--pic__flag"]}
                    style={{
                        cursor: edit ? "pointer" : "default",
                        pointerEvents: edit ? "auto" : "none",
                        background: `url('https://flagcdn.com/64x48/${
                            (data && data.nat) || "un"
                        }.png') center / contain no-repeat`,
                    }}
                    onClick={(e) => openFlagsHandler(e)}
                >
                    {flagsModal && (
                        <div className={classes.flagSelection}>
                            {Object.keys(flags).map((flag, i) => (
                                <label key={flag}>
                                    <input
                                        type="radio"
                                        name="nation"
                                        value={flag}
                                        onChange={() => flagChangeHandler(flag)}
                                        title={flags[flag].name}
                                        style={{
                                            background: `url(${flags[flag].url.small}) center / contain no-repeat`,
                                        }}
                                    />
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* INPUTS */}
            <div className={classes["profile__user--namecontainer"]}>
                <div className={classes["profile__user--name"]}>
                    <input
                        type="text"
                        name="username"
                        id='username'
                        title={edit
                                ? 'click to change username'
                            : 'your profile data is locked - please unlock it first'
                        }
                        value={username || ""}
                        style={edit ? {
                            background: '#dbd3d8',
                            color: '#235074',
                        } : null}
                        readOnly={edit ? false : true}
                        onChange={(e) => inputChangeHandler(e.target)}
                        onBlur={(e) =>
                            edit
                                ? validation(
                                    e.target,
                                    currentUser,
                                    setCurrentUser,
                                    setResponse
                                )
                                : null
                        }
                    />
                </div>
                <div className={classes["profile__user--email"]}>
                    <input
                        type="text"
                        name="email"
                        title={edit
                            ? 'you can\'t change your email - please create a new account'
                            : 'your profile data is locked - please unlock it first'
                        }
                        value={email || ""}
                        readOnly={edit ? true : true}
                        onChange={(e) => inputChangeHandler(e.target)}
                        onBlur={(e) =>
                            edit
                                ? validation(
                                    e.target,
                                    currentUser,
                                    setCurrentUser,
                                    setResponse
                                )
                                : null
                        }
                    />
                </div>
            </div>
            <div className={classes["profile__user--iconcontainer"]}>
                <FaEdit
                    className={classes["profile__user--editIcon"]}
                    style={{ color: edit ? "lime" : "red" }}
                    title={"Edit profile"}
                    onClick={() => setEdit(!edit)}
                />

                <FaTrashAlt
                    className={classes["profile__user--trashIcon"]}
                    title={"Delete profile"}
                    style={{
                        visibility: edit ? "visible" : "hidden",
                        color: usernameFocus ? 'grey' : null,
                        cursor: usernameFocus ? 'default' : null,
                    }}
                    onClick={!usernameFocus ? modalHandler : null}
                />
            </div>
            {openDeleteModal && (
                <DeleteUser setOpenDeleteModal={setOpenDeleteModal} />
            )}
        </section>
    );
}

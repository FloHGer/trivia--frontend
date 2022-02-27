import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/loginContext";

import classes from "./DeleteUser.module.scss";
import FadeOut from "../../../common/FadeOut";
import Card from "../../../common/Card";
import Button from "../../../common/Button";
import styles from "../../../common/Button.module.scss";

const DeleteUser = ({ setOpenDeleteModal }) => {
    const [currentUser, setCurrentUser] = useAuth();
    const [finalScreen, setFinalScreen] = useState(false);
    const navigate = useNavigate();

    const deleteProfile = async () => {
        try {
            const deleteUser = await (
                await axios.delete(
                    `${process.env.REACT_APP_BACKEND}/user/${currentUser}`
                )
            ).data.message;
            if (deleteUser === "user deleted") {
                setFinalScreen(true);
                setTimeout(() => {
                    return (
                        navigate("/"), setCurrentUser(false)
                    );
                }, 3000);
            }
        } catch (err) {}
    };

    return (
        <>
            <FadeOut onClick={() => setOpenDeleteModal(false)}></FadeOut>
            {!finalScreen && (
                <Card className={classes["modal"]}>
                    <h2>Do you really want to delete your profile?</h2>
                    {/* SUBMIT / CANCEL BUTTONS */}
                    <div className={classes["modal__button--container"]}>
                        <Button
                            className={styles.btn__red}
                            title={"delete"}
                            onClick={deleteProfile}
                            maxWidth="18rem"
                            maxHeight="6rem"
                            fontSize="2.3rem"
                            borderRadius="1rem"
                        ></Button>
                        <Button
                            className={styles.btn__blue}
                            title={"cancel"}
                            maxWidth="18rem"
                            maxHeight="6rem"
                            fontSize="2.3rem"
                            borderRadius="1rem"
                            onClick={() => setOpenDeleteModal(false)}
                        ></Button>
                    </div>
                </Card>
            )}
            {finalScreen && (
                <Card className={classes["modal"]}>
                    <div className={classes["modal__finalScreen"]}>
                        <h2>{`GOOD BYE`}</h2>
                        <h2>
                            <span>{`${currentUser}`}</span>
                        </h2>
                        <h2>{`Your profile was successfully deleted!`}</h2>
                    </div>
                </Card>
            )}
        </>
    );
};

export default DeleteUser;

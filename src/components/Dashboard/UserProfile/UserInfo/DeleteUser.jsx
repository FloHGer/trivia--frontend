import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/loginContext";

import classes from "./DeleteUser.module.scss";

const DeleteUser = ({setIsOpen}) => {
   const [currentUser, setCurrentUser] = useAuth();
   const navigate = useNavigate();

   const deleteProfile = async () => {
      try {
         const deleteUser = await (
            await axios.delete(
               `${process.env.REACT_APP_BACKEND}/user/${currentUser}`
            )
         ).data.message;
         if (deleteUser === "user deleted") {
            navigate("/");
            return setCurrentUser(false);
         }
      } catch (err) {}
   };

   return (
      <div
         className={classes["modal-overlay"]}
         onClick={() => setIsOpen(false)}
         style={{ border: "3px solid green" }}
      >
         <div className={classes["modal"]}>
            <h2>Do you really want to delete your profile?</h2>
            {/* SUBMIT / CANCEL BUTTONS */}
            <div className={classes["modal__button--container"]}>
               <button
                  className={classes["modal--button"]}
                  onClick={deleteProfile}
               >
                  Delete
               </button>
               <button
                  className={classes["modal--button"]}
                  onClick={() => setIsOpen(false)}
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
};

export default DeleteUser;

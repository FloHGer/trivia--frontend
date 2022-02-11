import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/loginContext";

import classes from "./DeleteUser.module.scss";
import FadeOut from '../../../common/FadeOut'
import Card from "../../../common/Card";
import Button from "../../../common/Button";
import styles from '../../../common/Button.module.scss'


const DeleteUser = ({ setOpenDeleteModal }) => {
   const [currentUser, setCurrentUser] = useAuth();
   const [isDeleted, setIsDeleted] = useState()
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
            setIsDeleted(true)
            setCurrentUser(false);
            
         }
      } catch (err) {}
   };
   
   useEffect (()=> {
      console.log("test2");
      if (isDeleted) {
         setFinalScreen(true);
         setTimeout(() => {
         
         return console.log("test");;
      }, 3000)
      navigate('/')
      };
   }, [isDeleted, navigate])

   return (
      <>
         <FadeOut onClick={() => setOpenDeleteModal(false)}></FadeOut>
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
                  borderRadius="2rem"
               ></Button>
               <Button
                  className={styles.btn__blue}
                  title={"cancel"}
                  maxWidth="18rem"
                  maxHeight="6rem"
                  borderRadius="2rem"
                  onClick={() => setOpenDeleteModal(false)}
               ></Button>
            </div>
         </Card>
         {finalScreen && (
            <Card maxWidth={"30%"}>
               <div>
                  <h2>{"Congratulations:"}</h2>
                  <p>{`Your profile was deleted!`}</p>
               </div>
            </Card>
         )}
      </>
   );
};

export default DeleteUser;

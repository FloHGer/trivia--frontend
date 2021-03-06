import { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { useAuth } from "../../../../context/loginContext";

import classes from "./UserInfoCard.module.scss";
import Card from "../../../common/Card";
import Button from "../../../common/Button";
import styles from "../../../common/Button.module.scss";

const FileUpload = ({ setImageModal, setImage }) => {
   const [currentUser] = useAuth();
   const [file, setFile] = useState("");
   const [preview, setPreview] = useState("");

   const changeHandler = (e) => {
      if (e.target.files.length) {
         setPreview({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
         });
         setFile(e.target.files[0]);
      }
   };

   const handleSubmission = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("userImg", file);
      try {
         const response = await axios.post(
            `${process.env.REACT_APP_BACKEND}/user/${currentUser}/upload`,
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
               data: formData,
            }
         );
         if (response.data.message !== "profile image uploaded")
            console.log(response.data.message);
         setImage(null);
         setImageModal(false);
      } catch (err) {
         console.log(err);
      }
   };

   const deleteImage = async (key) => {
      try {
         const deleteImg = await axios.get(
             `${process.env.REACT_APP_BACKEND}/user/${currentUser}/upload`
         );
         console.log(deleteImg)
         if (deleteImg.data.message !== "Profile image deleted")
             console.log(deleteImg.data.message);
         setImage(`${process.env.REACT_APP_BACKEND}/default.png`);
         setImageModal(false);
         console.log(`${process.env.REACT_APP_BACKEND}/default.png`);
      } catch (err) {
          console.log(err);
      }
   }

   return (
       <>
           {/* <FadeOut ></FadeOut> */}
           <Card className={classes["profile__user--pic__modal"]}>
               <h2>Wanna change the picture?</h2>
               {/* CONTENT */}

               <label
                   htmlFor="file"
                   className={
                       classes["profile__user--pic__modal--customButton"]
                   }
               >
                   <input
                       type="file"
                       name="file"
                       id="file"
                       onChange={changeHandler}
                   />
                   select your file
               </label>
               {preview && (
                   <div>
                       <img
                           src={preview.preview}
                           alt="profile-pic"
                           className={classes["profile__user--pic__img"]}
                       />
                   </div>
               )}

               {/* SUBMIT / CANCEL BUTTONS */}
               <div
                   className={
                       classes["profile__user--pic__modal__button--container"]
                   }
               >
                   <Button
                       className={styles.btn__blue}
                       maxWidth="15rem"
                       maxHeight="5rem"
                       fontSize="2rem"
                       borderRadius="1rem"
                       title="Submit"
                       disabled = {!file}
                       onClick={handleSubmission}
                   ></Button>
                   <Button
                       className={styles.btn__blue}
                       maxWidth="15rem"
                       maxHeight="5rem"
                       fontSize="2rem"
                       borderRadius="1rem"
                       title="cancel"
                       onClick={() => setImageModal(false)}
                   ></Button>
               </div>
               <Button
                   className={styles.btn__red}
                   maxWidth="60%"
                   maxHeight="5rem"
                   margin="1.5rem auto"
                   fontSize="2rem"
                   borderRadius="1rem"
                   title="delete Image"
                   onClick={deleteImage}
               ></Button>
           </Card>
       </>
   );
};

export default FileUpload;

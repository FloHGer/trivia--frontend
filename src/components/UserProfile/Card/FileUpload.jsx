import { useState } from "react";
import axios from "axios";

import { useAuth } from "../../../context/loginContext";


const FileUpload = () => {
   const [currentUser] = useAuth();
   const [file, setFile] = useState("");

   const fileHandler = (e) => {
      setFile(e.target.files[0]);
   };

   const submitFile = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("userImg", file);

      try {
         const newImage = await axios.post(
            `${process.env.REACT_APP_BACKEND}/user/${currentUser}/upload`,
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            }
         );
         console.log(newImage)
         if(newImage.data.message !== 'profile image uploaded') console.log(newImage.data.message)
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <>
         <h2>{'Change your Image here'}</h2>
         <form onSubmit={submitFile}>
            <label htmlFor="customFile">
               
               <input type="file" id="customFile" onChange={fileHandler} />
            </label>
            <input type="submit" value="upload new image" />
         </form>
      </>
   );
};

export default FileUpload;

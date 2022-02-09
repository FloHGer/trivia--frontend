import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/loginContext";
import { RiCloseLine } from "react-icons/ri";

const FileUpload = ({ className, setImageModal, setImage }) => {
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
            }
         );
         if (response.data.message !== "profile image uploaded")
            console.log(response.data.message);
         setImage(null)
         setImageModal(false);
      } catch (err) {
         console.log(err);
      }

      console.log("Modal", file);
      // setImageModal(true);
   };

   return (
      <>
         {/* <div onClick={() => setImageModal(false)} /> */}
         <div className={className}>
            <div>
               <div>
                  <h2>Wanna change the picture?</h2>
               </div>

               {/* CONTENT */}

               <input type="file" name="file" onChange={changeHandler} />
               {preview && (
                  <div>
                     <img
                        src={preview.preview}
                        alt="profile-pic"
                        style={{ width: "150px", maxHeight: "200px" }}
                     />
                  </div>
               )}

               {/* SUBMIT / CANCEL BUTTONS */}
               <div>
                  <div>
                     <button onClick={handleSubmission}>Submit</button>
                     <button onClick={() => setImageModal(false)}>
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default FileUpload;

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/loginContext";
// import { blob } from "node:stream/consumers";
import { RiCloseLine } from "react-icons/ri";


const FileUpload = ({ setIsOpen, setImage }) => {
   const [currentUser] = useAuth();
   const [file, setFile] = useState("");
   const [preview, setPreview] = useState("");

   const [isSelected, setIsSelected] = useState(false);

   const changeHandler = (e) => {
      if (e.target.files.length) {
         setPreview({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
         });
         setFile(e.target.files[0]);
      }
      
      setIsSelected(true);
      setIsOpen(true);
   };


   const handleSubmission = async (e) => {
      e.preventDefault()
   
      const formData = new FormData();
      formData.append("userImg", file);
      console.log("file", file);
      console.log("formData", formData);
      try {
         const newImage = await axios.post(
            `${process.env.REACT_APP_BACKEND}/user/${currentUser}/upload`,
            formData,
            {headers: {"Content-Type": "multipart/form-data",},}
         );
         console.log(newImage);
         if (newImage.data.message !== "profile image uploaded") console.log(newImage.data.message);
         setImage(newImage);
         setIsOpen(false);
      } catch (err) {console.log(err);}
            
      setImage(file);
      console.log("Modal", file);
      setIsOpen(true);
      // closeModal()
   };


   return (
      <>
         <div onClick={() => setIsOpen(false)} />
         <div>
            <div>
               <div>
                  <h2>Wanna change the picture?</h2>
               </div>
               {/* CLOSING BUTTON */}
               <button onClick={() => setIsOpen(false)}>
                  <RiCloseLine style={{ marginBottom: "-3px" }} />
               </button>

               {/* CONTENT */}
               <div>
                  <input
                     type="file"
                     name="file"
                     onChange={changeHandler}
                  />
                  {isSelected ? (
                     <div>
                        <img
                           src={preview.preview}
                           alt="profile-pic"
                           style={{ width: "150px", maxHeight: "200px"}}
                        />
                     </div>
                  ) : null}
               </div>

               {/* SUBMIT / CANCEL BUTTONS */}
               <div>
                  <div>
                     <button onClick={handleSubmission}>Submit</button>
                     <button onClick={() => setIsOpen(false)}>Cancel</button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default FileUpload;

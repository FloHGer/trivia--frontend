import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import FileUpload from './FileUpload';
import {validation} from '../../../../common/inputValidation.js';
import {flags} from '../../../../common/flags.js';
import {useAuth} from '../../../../context/loginContext.js';

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import classes from './UserInfoCard.module.scss';
import DeleteUser from './DeleteUser';

export default function UserInfoCard() {
	const [currentUser, setCurrentUser] = useAuth();
	const [data, setData] = useState();
	const [nat, setNat] = useState();
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [edit, setEdit] = useState(false);
	const selectRef = useRef();
	const uploadRef = useRef();
	const [image, setImage] = useState();
	const [isOpen, setIsOpen] = useState();
   const [openDeleteModal, setOpenDeleteModal] = useState();

   

	useEffect(() => {
		setEdit(false);
	}, []);

	useEffect(() => {
		(async () => {
			const response = (await axios.get(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`)).data;
			if (response.message === 'success') {
				setData(response.payload);
				setUsername(response.payload.username);
				setEmail(response.payload.email ? response.payload.email : 'enter your email');
				setImage(response.payload.img);
			}
		})();
	}, [currentUser, nat, image]);

	const inputChangeHandler = ({name, value}) => {
		name === 'username' ? setUsername(value) : setEmail(value);
	};

	const flagChangeHandler = async key => {
		try {
			selectRef.current.style.visibility = 'collapse';
			const update = (await axios.patch(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`, {updates: {nat: key}})).data.message;
			if (update === 'success') return setNat(data.nat);
		} catch (err) {}
	};

	const openFlagsHandler = e => {
		e.stopPropagation();
		if (selectRef.current.style.visibility === 'visible') return (selectRef.current.style.visibility = 'collapse');
		uploadRef.current.style.visibility = 'collapse';
		selectRef.current.style.visibility = 'visible';
	};

	const openImageUpload = e => {
		e.stopPropagation();
		// if (!isOpen) {
         if (uploadRef.current.style.visibility === 'visible') return (uploadRef.current.style.visibility = 'collapse');
			selectRef.current.style.visibility = 'collapse';
			uploadRef.current.style.visibility = 'visible';
		// }
      // setIsOpen(true);
	};

   

	return (
      <section className={classes.profile__user}>
         <div className={classes["profile__user--piccontainer"]}>
            {/* PIC */}
            <div
               className={classes["profile__user--pic"]}
               style={{
                  cursor: edit ? "pointer" : "default",
                  pointerEvents: edit ? "auto" : "none",
                  background: `url(${image || ""}) center / cover no-repeat`,
               }}
               onClick={(e) => openImageUpload(e)}
            >
               <div
                  className={classes["profile__user--pic__modal"]}
                  ref={uploadRef}
               >
                  {isOpen && (
                     <FileUpload setImage={setImage} setIsOpen={setIsOpen} />
                  )}
               </div>
               {/* FLAGS */}
               <div
                  className={classes["profile__user--pic__flag"]}
                  style={{
                     cursor: edit ? "pointer" : "default",
                     pointerEvents: edit ? "auto" : "none",
                     background: `url('https://flagcdn.com/64x48/${
                        (data && data.nat) || "un"
                     }.png') center / cover no-repeat`,
                  }}
                  onClick={(e) => openFlagsHandler(e)}
               >
                  <div className={classes.flagSelection} ref={selectRef}>
                     {Object.keys(flags).map((flag, i) => (
                        <label key={flag}>
                           <input
                              type="radio"
                              name="nation"
                              value={flag}
                              onChange={() => flagChangeHandler(flag)}
                              title={flags[flag].name}
                              style={{
                                 background: `url(${flags[flag].url.small}) center / cover no-repeat`,
                              }}
                           />
                        </label>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         {/* INPUTS */}
         <div className={classes["profile__user--namecontainer"]}>
            <div className={classes["profile__user--name"]}>
               <input
                  type="text"
                  name="username"
                  value={username || ""}
                  readOnly={edit ? false : true}
                  onChange={(e) => inputChangeHandler(e.target)}
                  onBlur={(e) =>
                     edit
                        ? validation(e.target, currentUser, setCurrentUser)
                        : null
                  }
               />
            </div>
            <div className={classes["profile__user--email"]}>
               <input
                  type="text"
                  name="email"
                  value={email || ""}
                  readOnly={edit ? false : true}
                  onChange={(e) => inputChangeHandler(e.target)}
                  onBlur={(e) =>
                     edit
                        ? validation(e.target, currentUser, setCurrentUser)
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
               style={{ color: edit ? "red" : "grey" }}
               title={"Delete profile"}
               onClick={() => setOpenDeleteModal(true)}
            />
         </div>
         {openDeleteModal && (
            <DeleteUser setOpenDeleteModal={setOpenDeleteModal} />
         )}
      </section>
   );
}

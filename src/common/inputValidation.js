import axios from "axios";


export const validation = async(target, currentUser, setCurrentUser, setResponse) => {
  try{
    if(target.name === 'username'
    && (target.value.length < 2
    || target.value.includes(' '))) return setResponse(['ERROR', 'at least 2 chars required & no spaces allowed']);

    if(target.name === 'email'
    && !target.value
      .match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)
      ) return;
    // if ok
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`, {
      updates:{
        [target.name === 'username' ? 'username' : 'email']: target.value,
      }
    });
    if (response.data.message !== "user updated") return setResponse(['ERROR', `${target.name} taken!`]);
    setResponse(['SUCCESS', `${target.name} updated!`]);
    if(target.name === 'username') setCurrentUser(target.value);
  }catch(err){console.log(err)}
}

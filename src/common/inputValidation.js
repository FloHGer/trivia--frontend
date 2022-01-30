import axios from "axios";


export const validation = async(target, currentUser, setCurrentUser) => {
  try{
    if(target.name === 'username'
    && target.value.length < 2) return;

    if(target.name === 'email'
    && !target.value
      .match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)
      ) return console.log('fail');
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`, {
      updates:{
        [target.name === 'username' ? 'username' : 'email']: target.value,
      }
    });
    if(response.data.message !== 'success') return;
    if(target.name === 'username') setCurrentUser(target.value)
  }catch(err){console.log(err)}
}

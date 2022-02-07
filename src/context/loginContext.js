import {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function Auth({children}) {
	const [currentUser, setCurrentUser] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_BACKEND}/auth/check`, {withCredentials: true});
				if (res.data.message === 'success') setCurrentUser(res.data.payload);
				if (res.data.message !== 'success') setCurrentUser(false);
			} catch (err) {console.error(err)}
		})();
	}, [currentUser]);

	return <AuthContext.Provider value={[currentUser, setCurrentUser]}>{children}</AuthContext.Provider>;
}

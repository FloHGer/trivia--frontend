import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../../context/loginContext";

import classes from './Square.module.scss';


export default function Square({title, target, size, onClick}) {
	const [, setCurrentUser] = useAuth();
	const navigate = useNavigate();

	const logoutHandler = async() => {
		const res = await axios.get(`${process.env.REACT_APP_BACKEND}/auth/logout`, {withCredentials: true});
		if(res.data.message === 'logged out') {
			setCurrentUser(null);
			navigate('/');
		};
	}

	return (
		<Link to={target ? target : ''}>
			<div 
				className={classes.box}
				style={{width: size, height: size}}
				onClick={onClick ? logoutHandler : null}
			>
				<div className={classes.square} title={title}>
					{title === 'LogOut'
						? <FaSignOutAlt className={classes.logout__icon} />
						: <h3 className='heading heading__3'>{title}</h3>
					}
				</div>
			</div>
		</Link>
	)
}

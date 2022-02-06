import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../../context/loginContext";

import classes from './Square.module.scss';


export default function Square({title, target, size, onClick, color, disabled}) {
	const [currentUser, setCurrentUser] = useAuth();
	const navigate = useNavigate();

	const logHandler = async() => {
		const res = await axios.get(`${process.env.REACT_APP_BACKEND}/auth/logout`, {withCredentials: true});
		if(res.data.message === 'logged out') {
			setCurrentUser(null);
			navigate('/');
		};
	}

	const MyLink = ({condition, to, children}) =>
		condition
			? <Link to={to}>{children}</Link>
			: <>{children}</>



	return (
		<li>
			<MyLink condition={target} to={target ? target : null}>
				<button
					disabled={disabled}
					className={`
						${classes.box}
						${title === 'LogIn / LogOut' ? classes.logSquare : ''}
					`}
					style={{width: size, height: size}}
					onClick={
						onClick === 'logout'
							? currentUser
								? logHandler
								: () => navigate('/login')
							: onClick
						}
				>
					<div className={`${classes.square} ${classes[color]}`} title={title}>
						{title === 'LogIn / LogOut'
							? currentUser
								? <FaSignOutAlt className={classes.logout__icon} />
								: <FaSignInAlt className={classes.login__icon} />
							: <h3 className='heading heading__3'>{title}</h3>
						}
					</div>
				</button>
			</MyLink>
		</li>
	)
}

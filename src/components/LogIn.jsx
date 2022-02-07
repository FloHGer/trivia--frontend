import {useState} from 'react';
import {Link} from 'react-router-dom';

import {FaGithub, FaGoogle, FaTimesCircle} from 'react-icons/fa';
import FadeOut from '../components/common/FadeOut';
import Card from './common/Card';

import classes from './LogIn.module.scss';

export default function LogIn() {
	const [email, setEmail] = useState();
	const [btnDisabled, setBtnDisabled] = useState(true);

	const updateInputHandler = event => {
		setBtnDisabled(true);
		setEmail(event.value);

		if (event.value.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i))
			setBtnDisabled(false);
	};

	const submitHandler = event => {
		event.preventDefault();
	};

	return (
		<main>
			<Card>
				<Link to='/'>
					<FaTimesCircle className={classes.login__icon} />
				</Link>
				<div className={classes.login__text}>
					<h3 className='heading heading__3'>{'You need to be logged in to play like A true warrior!'}</h3>
					<p className={classes.break}>{'No worries, we will register you on the way'}</p>
				</div>
				<form onSubmit={submitHandler}>
					<label htmlFor=''>{'Your email'}</label>
					<input type='email' name='text' value={email} placeholder='enter your email' onChange={(e) => updateInputHandler(e)} />
					<button type='submit' className={classes.btn} disabled={btnDisabled}>
						{'Log in'}
					</button>
					<p className={classes.break}>{'OR'}</p>
				</form>
				<div className={classes.login__socials}>
					<button
						className={classes['login__socials--google']}
						onClick={() => window.open(`${process.env.REACT_APP_BACKEND}/auth/google`, '_self')}
					>
						<FaGoogle className={classes['login__socials--icon']} />
					</button>
					<button
						className={classes['login__socials--github']}
						onClick={() => window.open(`${process.env.REACT_APP_BACKEND}/auth/github`, '_self')}
					>
						<FaGithub className={classes['login__socials--icon']} />
					</button>
				</div>
			</Card>
			<FadeOut />
		</main>
	);
}
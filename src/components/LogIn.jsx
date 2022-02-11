import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import {FaGithub, FaGoogle, FaTimesCircle} from 'react-icons/fa';
import FadeOut from '../components/common/FadeOut';
import Card from './common/Card';
import FeedbackCard from './common/FeedbackCard';

import classes from './LogIn.module.scss';

export default function LogIn() {
	const navigate = useNavigate();
	const [feedback, setFeedback] = useState('');
	const [email, setEmail] = useState('');
	const [btnDisabled, setBtnDisabled] = useState(true);

	const updateInputHandler = value => {
		setBtnDisabled(true);
		setEmail(value);

		if (value.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i))
			setBtnDisabled(false);
	};

	const submitHandler = async event => {
		event.preventDefault();
		try{
			const res = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/email`, {email});
			if(res.data.message === 'email sent') return setFeedback(res.data.message);
		}catch(err){console.log(err)}
	};

	// useEffect(() =>{
	// 	const escHandler = k => k.key === 'Escape' ? navigate('/') : null;
  //   document.addEventListener('onkeydown', escHandler);

  //   return () => document.removeEventListener('onkeydown', escHandler)
	// })

	// useEffect(function setupListener() {
  //   function escHandler(k) {
	// 		if(k.key === 'Escape') navigate('/')
  //   }
  //   document.addEventListener('onkeydown', escHandler)

  //   return function cleanupListener() {
  //     document.removeEventListener('onkeydown', escHandler)
  //   }
  // })


	return (
		<main>
			{feedback && <FeedbackCard title={feedback} text={'check your emails to log in'} link={'/'} />}
			<Card>
				<Link to='/'>
					<FaTimesCircle className={classes.login__icon} />
				</Link>
				<div className={classes.login__text}>
					<h3 className='heading heading__2'>{'You need to be logged in, to play with all benefits!'}</h3>
					<p>{'No worries, we will register you on the way!'}</p>
				</div>

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

				<p className={classes.break}>{'OR'}</p>

				<form onSubmit={submitHandler}>
					<div className={classes.email}>
						<label className={classes.label} htmlFor='email'>{'Your email'}
						<input type='email' name='email' id='email' value={email} onChange={(e) => updateInputHandler(e.target.value)} />
						</label>
					</div>
					<button type='submit' className={classes.btn} disabled={btnDisabled}>
						{'Log in'}
					</button>
				</form>
			</Card>
			<FadeOut onClick={true}/>
		</main>
	);
}

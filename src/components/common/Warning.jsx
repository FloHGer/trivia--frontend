import {Link, useNavigate} from 'react-router-dom';
import {FaTimesCircle} from 'react-icons/fa';

import FadeOut from './FadeOut';
import Card from './Card';
import Button from './Button';
import {categorySelection} from '../../common/categorySelection.js';
import {useCategories, useAllCategories} from '../../context/gameContext';

import styles from './Button.module.scss';
import classes from './Warning.module.scss';

export default function Warning({setWarning}) {
	const navigate = useNavigate();
	const [allCategories] = useAllCategories();
	const [selectedCategories, setSelectedCategories] = useCategories();

	// document.onkeydown = (k) => k.key === 'Escape' ? setWarning(false) : null;


	return (
		<div className={classes.warning}>
			<Card className={classes.card}>
				<FaTimesCircle className={classes.warning__icon} onClick={() => setWarning(false)} style={{cursor: 'pointer'}} />

				<h2 className={`${classes.warning__red}`}>{'WARNING! ACHTUNG! UWAGA!'}</h2>

				<h3 className={'heading heading__3'}>
					{'This is '}
					<strong className={`${classes.warning__red}`}>{'quickgame '}</strong>
					{'mode:'}
				</h3>

				<h4 className={`heading ${classes.warning__red}`}><strong>{'no '}</strong>{'statistics!'}</h4>

				<h4 className={`heading ${classes.warning__red}`}><strong>{'no '}</strong>{'rankings!'}</h4>

				<h4 className={`heading ${classes.warning__red}`}><strong>{'no '}</strong>{'achievements!'}</h4>

				<h4 className={`heading ${classes.warning__gold}`}><strong>{'no '}</strong>{'glory!'}</h4>

				<div className={classes.warning__buttons}>
					<Button
						className={styles.btn__blue}
						title={'Play!'} 
						onClick={() =>
							categorySelection(undefined, setSelectedCategories, allCategories, navigate)
						}
					/>
					<p>{'OR'}</p>
					<Link to='/login'>
						<Button title='LogIn' />
					</Link>
				</div>
			</Card>
			<FadeOut onClick={() => setWarning(false)}/>
		</div>
	);
}

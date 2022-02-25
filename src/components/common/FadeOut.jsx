import {useNavigate} from 'react-router-dom';

import classes from './FadeOut.module.scss';

export default function FadeOut({onClick, target, children}) {
	const navigate = useNavigate();

	return (
		<div
			className={classes.fadeOut}
			onClick={target ? () => navigate(target) : onClick}
		>
			{children}
		</div>
	);
}

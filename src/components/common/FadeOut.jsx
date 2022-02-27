import {useNavigate} from 'react-router-dom';

import classes from './FadeOut.module.scss';

export default function FadeOut({onClick, target, background, children}) {
	const navigate = useNavigate();

	return (
		<div
			className={classes.fadeOut}
			onClick={target ? () => navigate(target) : onClick}
			style={{background: background || null}}
		>
			{children}
		</div>
	);
}

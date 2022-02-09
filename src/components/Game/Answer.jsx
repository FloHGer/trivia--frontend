
import Square from '../common/Square';

import classes from './Answer.module.scss';

export default function Answer({letter, text, background, answerHandler}) {

	return (
		<div className={classes.answer} onClick={() => answerHandler(text)} style={{background}}>
				<Square title={letter} size={'8vh'} />
			<p className={classes.answer__text}>
				{text}
			</p>
		</div>
	);
}

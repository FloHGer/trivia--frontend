

import classes from './Answer.module.scss';

export default function Answer({letter, text, background, answerHandler}) {

	return (
		<div className={classes.answer} onClick={() => answerHandler(text)} style={{background}}>
				<h3 className={classes.answer__letter}>
					{letter}
				</h3>
			<p className={classes.answer__text}>
				{text}
			</p>
		</div>
	);
}

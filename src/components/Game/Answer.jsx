
import Square from '../common/Square';

import classes from './Answer.module.scss';

export default function Answer({letter, text, background, answerHandler, disabled}) {

	return (
		<button 
			className={classes.answer}
			onClick={() => answerHandler(text)}
			style={{background}}
			disabled={disabled}
		>
			<Square title={letter} size={'6rem'} />
			<p className={classes.answer__text}>
				{text}
			</p>
		</button>
	);
}


import { useShowQuestion } from '../../context/gameContext';
import { useAnswers } from '../../context/gameContext';

import classes from './../../sass/components/Question/QuestionAnswer.module.scss';

export default function Answer({letter, text}) {
	const [showQuestion, setShowQuestion] = useShowQuestion();
	const [allAnswers, setAllAnswers] = useAnswers();

	const answerHandler = () => {
		setAllAnswers([...allAnswers, allAnswers[showQuestion.category] = [...allAnswers[showQuestion.category],
			text === showQuestion.question.correct_answer ? true : false]]);
		setTimeout(() => {
			setShowQuestion(null);
		}, 3000);
	}


	return (
		<div className={classes.answer} onClick={() => answerHandler()}>
			<div className={classes.answer__decoration}>
				<h3 className={classes.answer__letter}>
					{letter}
				</h3>
			</div>
			<p className={classes.answer__text}>
				{text}
			</p>
		</div>
	);
}

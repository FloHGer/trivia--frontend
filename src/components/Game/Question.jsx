import { useEffect, useState } from 'react';

import Answer from './Answer';
import Card from '../common/Card';
import FadeOut from '../common/FadeOut';
import {useShowQuestion, useAnswers} from '../../context/gameContext';

import classes from './Question.module.scss';


export default function Question() {
	const [showQuestion, setShowQuestion] = useShowQuestion();
	const [allAnswers, setAllAnswers] = useAnswers();
	const [answers, setAnswers] = useState([]);
	const [colors, setColors] = useState(['', '', '', '']);
	const [locked, setLocked] = useState(false);

	const answerHandler = (text) => {
		setLocked(true);
		allAnswers[showQuestion.category][showQuestion.index] = showQuestion.question.correct_answer === text ? true : false;
		setAllAnswers([...allAnswers]);

		colors[answers.indexOf(showQuestion.question.correct_answer)] = '#080';
		if(showQuestion.question.correct_answer !== text)
			colors[answers.indexOf(text)] = '#910a0a'
		setColors(colors);

		setTimeout(() => {
			setShowQuestion(null);
		}, 3000);
	}

	useEffect(() => {
		const answersArr = [showQuestion.question.correct_answer, ...showQuestion.question.incorrect_answers];
		answersArr.sort(() => (Math.random() > 0.5 ? 1 : -1));
		setAnswers(answersArr);
	}, [showQuestion.question]);


	return (
		<FadeOut>
			<Card>
				<h2 className={classes.question}>{showQuestion.question.question}</h2>
				<div className={classes.answers}>
					<Answer
						letter='A'
						text={answers[0]}
						answerHandler={answerHandler}
						background={colors[0]}
						disabled={locked}
					/>
					<Answer
						letter='B'
						text={answers[1]}
						answerHandler={answerHandler}
						background={colors[1]}
						disabled={locked}
					/>
				</div>
				{showQuestion.question.type !== 'boolean' &&
					<div className={classes.answers} >
						<Answer
							letter='C'
							text={answers[2]}
							answerHandler={answerHandler}
							background={colors[2]}
							disabled={locked}
						/>
						<Answer
							letter='D'
							text={answers[3]}
							answerHandler={answerHandler}
							background={colors[3]}
							disabled={locked}
						/>
					</div>
				}
			</Card>
		</FadeOut>
	);
}

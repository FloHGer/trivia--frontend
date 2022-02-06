import { useEffect, useState } from 'react';

import Answer from './Answer';
import Card from '../common/Card';
import {useShowQuestion} from '../../context/gameContext';

import classes from './Question.module.scss';


export default function Question() {
	const [showQuestion] = useShowQuestion();

	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		const answersArr = [showQuestion.question.correct_answer, ...showQuestion.question.incorrect_answers];
		answersArr.sort(() => (Math.random() > 0.5 ? 1 : -1));
		setAnswers(answersArr);
	}, [showQuestion.question]);


	return (
		<div>
			<Card>
				<h2 className={classes.question}>{showQuestion.question.question}</h2>
				<div className={classes.question__container}>
					<Answer
						letter='A'
						text={answers[0]}
					/>
					<Answer
						letter='B'
						text={answers[1]}
					/>
				</div>
				<div className={classes.question__container} style={{visibility: showQuestion.type === 'boolean' ? 'collapse' : 'visible'}}>
					<Answer
						letter='C'
						text={answers[2]}
					/>
					<Answer
						letter='D'
						text={answers[3]}
					/>
				</div>
			</Card>
		</div>
	);
}

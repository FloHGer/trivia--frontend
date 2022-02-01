import {useEffect, useState} from 'react';
import axios from 'axios';

import Spinner from '../components/common/Spinner';
import Category from '../components/Game/GameCategory';
import Question from '../components/Game/Question';
import { useCategories, useShowQuestion, useLoading, useAnswers } from "../context/gameContext";

import classes from './../sass/pages/Game.module.scss';

export default function Game() {
	const [selectedCategories] = useCategories();
	const [showQuestion] = useShowQuestion();
	const [isLoaded] = useLoading();
	const [allAnswers, setAllAnswers] = useAnswers();

	const [isLoading, setIsLoading] = useState(false); // set to true after testing
	const [score, setScore] = useState(0);

	useEffect(() => {
		if(isLoaded.length === 6) setIsLoading(false)
	}, [isLoaded]);
	

	// calc score
	useEffect(() => {
		let calcScore = 0;
		const correctCats = [];
		allAnswers.forEach(category => {
			category.forEach((question, qIndex) => {
				if(question) calcScore += (qIndex + 1) * 100;
				if(question && qIndex === 4 && correctCats.length < 6)
					correctCats.push(100 + correctCats.length * 100);
				if(correctCats.length === 6) correctCats[5] += 11;
			})
		})
		for (let i in correctCats) calcScore += correctCats[i];
		calcScore += correctCats.reduce((sum, cat) => sum + cat, 0);
		setScore(calcScore);
	}, [allAnswers]);


	return (
		<>
			<div className={classes.SCORECLASS_HERE}>
				<p>{score}</p>
			</div>
			<div className={classes.GAMECONTAINERCLASS_HERE}>
				{isLoading && <Spinner />}
				{showQuestion && <Question />}
				{!isLoading && !showQuestion &&
					selectedCategories.map((category, i) => (
						<Category data={category} index={i} key={i}/>
					))
				}
			</div>
		</>
	)
}

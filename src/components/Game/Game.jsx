import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import he from 'he';

import {useAuth} from '../../context/loginContext';
import {useAnswers, useCategories, useQuestions, useShowQuestion} from '../../context/gameContext';

import FeedbackCard from '../common/FeedbackCard';
import Square from '../common/Square';
import Spinner from '../common/Spinner';
import Progress from '../common/Progress';
import Logo from './Logo';
import Question from './Question';

import classes from './Game.module.scss';


export default function Game() {
	const navigate = useNavigate();
	const [currentUser] = useAuth();
	const [selectedCategories, setSelectedCategories] = useCategories();
	const [questions, setQuestions] = useQuestions();
	const [allAnswers, setAllAnswers] = useAnswers();
	const [showQuestion, setShowQuestion] = useShowQuestion();
	const [isLoading, setIsLoading] = useState(31);
	const [score, setScore] = useState(0);
	const [finalScreen, setFinalScreen] = useState(false);
	const [bonus, setBonus] = useState([0, 0, 0, 0, 0, 0]);


	// quit game
	const quit = () => {
		setFinalScreen(false);
		setSelectedCategories(['choose', 'choose', 'choose', 'choose', 'choose', 'choose']);
		setQuestions([
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
		]);
		setAllAnswers([[], [], [], [], [], []]);
		setShowQuestion(null);
		navigate('/');
	};

	// post game data
	const postGame = () => {
		let counter = 0;
		allAnswers.forEach(category => {
			if (category.length === 5 || (category.length && !category[category.length - 1])) counter++;
		});
		// guest user
		if (!currentUser && counter === 6)
			return setTimeout(() => {
				return setFinalScreen([]);
			}, 1000);
		// known user
		if (currentUser && counter === 6) {
			const results = allAnswers.map((category, i) => {
				return {
					name: selectedCategories[i].name,
					answers: category,
				};
			});
			(async () => {
				const res = await axios.post(`${process.env.REACT_APP_BACKEND}/user/${currentUser}/games`, {
					score,
					categories: results,
				});
				if (res.data.message === 'game posted')
					return setTimeout(() => {
						return setFinalScreen(res.data.payload.achievs);
					}, 1000);
				return 'error';
			})();
		}
	};

	// calc score
	useEffect(() => {
		let calcScore = 0;
		allAnswers.forEach((category, i) => {
			category.forEach((question, j) => {
				if (question) calcScore += (j + 1) * 100;
				if (question && j === 4) {
					if (bonus.filter(value => value > 0).length === 5 && bonus[i] === 0)
						bonus[i] = 11 + (1 + bonus.filter(value => value > 0).length) * 100;
					setBonus(bonus);
					if (bonus.filter(value => value > 0).length < 5 && bonus[i] === 0) bonus[i] = (1 + bonus.filter(value => value > 0).length) * 100;
					setBonus(bonus);
				}
			});
		});
		calcScore += bonus.reduce((sum, value) => sum + value, 0);
		setScore(calcScore);
		postGame();
	}, [allAnswers]);

	// fetch questions
	useEffect(() => {
		let cats = [];
		let loadingCounter = isLoading;
		(async () => {
			for (let i = 0; i < selectedCategories.length; i++) {
				const easy = (await axios(`https://opentdb.com/api.php?amount=2&category=${selectedCategories[i].id}&difficulty=easy`)).data
					.results;
				loadingCounter -= 2;
				setIsLoading(loadingCounter);
				const medium = (await axios(`https://opentdb.com/api.php?amount=2&category=${selectedCategories[i].id}&difficulty=medium`)).data
					.results;
				loadingCounter -= 2;
				setIsLoading(loadingCounter);
				const hard = (await axios(`https://opentdb.com/api.php?amount=1&category=${selectedCategories[i].id}&difficulty=hard`)).data
					.results;
				loadingCounter -= 1;
				setIsLoading(loadingCounter);
				cats[i] = [...easy, ...medium, ...hard];
				cats[i].forEach(decoding => {
					decoding.question = he.decode(decoding.question);
					decoding.correct_answer = he.decode(decoding.correct_answer);
					decoding.incorrect_answers = decoding.incorrect_answers.map(answer => (answer = he.decode(answer)));
				});
			}
			setQuestions(cats);
			loadingCounter -= 1;
			setIsLoading(loadingCounter);
		})();
	}, [selectedCategories, setQuestions]);


	return (
		<>
			<header className={classes.header}>
				<Logo />
				<div className={classes.gameInfo}>
					<p>{`${score} points`}</p>
					{(currentUser && <p>{currentUser}</p>) || <p>{'Quick Game'}</p>}
					<Square
						button={true}
						title={'quit game'}
						color={'wrong'}
						size={'15rem'}
						onClick={quit}
						className={'cancelGame'}
						background={'#a10'}
					/>
				</div>
			</header>
			<main className={classes.container}>
				<div className={classes.game}>
					{finalScreen && (
						<FeedbackCard
							title={'Congratulations!'}
							text={`You got ${score} points!`}
							achievs={finalScreen}
							width={'40%'}
							height={'40%'}
							onClick={quit}
						/>
					)}
					{(isLoading && <Spinner isLoading={isLoading - 1} />) || null}
					{showQuestion && <Question />}
					{/* game table generation */}
					{!isLoading &&
						// category loop
						questions.map((category, i) => {
							return (
								<div key={i} className={classes.game__category}>
									<div className={classes.game__category__title}>
										{/* shorten long category titles */}
										<div className={classes.titleHeading}>
											<h2>
												{category[0].category.startsWith('Entertainment: Japanese')
													? category[0].category.slice(24)
													: category[0].category.startsWith('Entertainment:') || category[0].category.startsWith('Science:')
													? category[0].category.slice(category[0].category.indexOf(' ') + 1)
													: category[0].category}
											</h2>
										</div>
										{/* {(allAnswers[i][4] && <h3 className={classes.bonus}>+bonus</h3>) || <Progress value={allAnswers[i].length} max={5} />} */}
										{(bonus[i] && <h3 className={classes.bonus}>{`+${bonus[i]}`}</h3>) || <Progress value={allAnswers[i].length} max={5} />}
									</div>
									<ul className={classes.game__category__questions}>
										{/* question loop */}
										{questions[i].map((question, j, arr) => {
											let disabledState = true;
											if (
												(j === 0 && !allAnswers[i].length) ||
												(j !== 0 && allAnswers[i][j - 1] && allAnswers[i][j] === undefined && allAnswers[i].length < 5)
											)
												disabledState = false;
                      let answerState = 'inactive';
                      if(allAnswers[i].length > j) answerState = 'wrong';
                      if(allAnswers[i][j]) answerState = 'right';
                      if((!allAnswers[i].length && !j) || (allAnswers[i].length === j && allAnswers[i][j - 1]))
                        answerState = 'active';
                      
											return (
												<Square
													button={true}
													key={`[${i}][${j}]`}
													title={(j + 1) * 100}
													size={'10vh'}
													answerState={answerState}
													disabled={disabledState}
													onClick={() =>
														setShowQuestion({
															question,
															category: i,
															index: j,
														})
													}
												/>
											);
										})}
									</ul>
								</div>
							);
						})}
				</div>
			</main>
		</>
	);
}

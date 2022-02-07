import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import he from 'he'

import {useAuth} from '../../context/loginContext';
import {useAnswers, useCategories, useQuestions, useShowQuestion} from '../../context/gameContext';
import Button from '../common/Button';
import Square from '../common/Square';
import Spinner from '../common/Spinner';
import Question from './Question';
import Progress from '../common/Progress';

import classes from './Game.module.scss';


export default function Game() {
  const navigate = useNavigate();
  const [currentUser] = useAuth();
	const [selectedCategories, setSelectedCategories] = useCategories();
  const [questions, setQuestions] = useQuestions();
  const [allAnswers, setAllAnswers] = useAnswers();
  const [showQuestion, setShowQuestion] = useShowQuestion();

  const [isLoading, setIsLoading] = useState(true);
  const [correctCats, setCorrectCats] = useState([]);
  const [score, setScore] = useState(0);

  // quit game
  const quit = () => {
    setSelectedCategories([]);
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
  }

  // fetch questions
  useEffect(() => { 
    let cats = [];
    (async () => {
      for (let i = 0; i < selectedCategories.length; i++) {
        const easy = (
          await axios(
            `https://opentdb.com/api.php?amount=2&category=${selectedCategories[i].id}&difficulty=easy`
          )
        ).data.results;
        const medium = (
          await axios(
            `https://opentdb.com/api.php?amount=2&category=${selectedCategories[i].id}&difficulty=medium`
          )
        ).data.results;
        const hard = (
          await axios(
            `https://opentdb.com/api.php?amount=1&category=${selectedCategories[i].id}&difficulty=hard`
          )
        ).data.results;

        cats[i] = [...easy, ...medium, ...hard];
        cats[i].forEach(decoding => {
          decoding.question = he.decode(decoding.question)
          decoding.correct_answer = he.decode(decoding.correct_answer);
          decoding.incorrect_answers.forEach(answer => answer = he.decode(answer));
        })
      }
      setQuestions(cats);
      setIsLoading(false);
    })();
  }, [selectedCategories, setQuestions]);

  // calc score
  useEffect(() => {
    let calcScore = 0;
    const correctCats = [];
    allAnswers.forEach(category => {
      category.forEach((question, i) => {
        if(question) calcScore += (i + 1) * 100;
        if(question && i === 4 && correctCats.length < 6)
          correctCats.push(1 + correctCats.length);
        if(correctCats.length === 6) correctCats[5] += 11;
      });
    });
    calcScore += correctCats.reduce((sum, cat) => sum + cat * 100, 0);
    setScore(calcScore);
  }, [allAnswers]);

  // post game data
  useEffect(() => {
    let counter = 0;
    allAnswers.forEach(category => {
      if(category.length === 5 || (category.length && !category[category.length - 1])) counter++;
    })
    console.log(counter)
    if(!currentUser && counter === 6) setTimeout(() => {
      return quit();
    }, 3000);

    if(currentUser && counter === 6){
      const results = allAnswers.map((category, i, arr) => {
        return {
          name: selectedCategories[i].name,
          answers: arr,
        }
      });
      console.log(results)
      (async() => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND}/user/${currentUser}/games`,
          {
            score,
            categories: results,
          }
        );
        if(res.data.message === 'game posted') {
          return quit();
        }
        return 'error'; // design error popup
      })()
    }
  }, [score, currentUser, allAnswers, selectedCategories]);


  return (
    <main className={classes.container}>
      <div className={classes.gameInfo}>
        <p>{`${score} points`}</p>
        {currentUser && <p>{currentUser}</p>}
        <Square
          title={'quit game'}
          color={'wrong'}
          size={'15rem'}
          onClick={quit}
          className={'cancelGame'}
          background={'#a10'}
        />
      </div>
      <div className={classes.game}>
				{isLoading && <Spinner />}
        {showQuestion && <Question />}
{/* game table generation */}
        {!isLoading && !showQuestion &&
// category loop
          questions.map((category, i) => {

            return (
              <div
                key={i}
                className={classes.game__category}
              >
                <div className={classes.game__category__title}>
                  <h2>
                    {category[0].category.startsWith('Entertainment:')
                      || category[0].category.startsWith('Science:')
                        ? category[0].category.slice(category[0].category.indexOf(' ') + 1)
                        : category[0].category}
                  </h2>
                  {(allAnswers[i][4] && <h3>+bonus</h3>) || <Progress value={allAnswers[i].length} max={5} />}
                  {/* {(correctCats[i] && <h3>{correctCats[i]}</h3>) || <progress value={allAnswers[i].length} max={5} />} */}
                </div>
                <ul className={classes.game__category__questions}>
{/* question loop */}
                  {questions[i].map((question, j, arr) => {
                    let disabledState = true;
                    if((j === 0 && !allAnswers[i].length)
                    || (j !== 0 && allAnswers[i][j - 1] && allAnswers[i][j] === undefined && allAnswers[i].length < 5))
                      disabledState = false;

                      return(
                      <Square
                        key={`[${i}][${j}]`}
                        title={(j + 1) * 100}
                        size={'10vh'}
                        color={
                          allAnswers[i][j] 
                            ? 'right'
                            : (!allAnswers[i].length && !j) || (allAnswers[i].length === j && allAnswers[i][j - 1])
                              ? 'active'
                              : allAnswers[i].length > j
                                ? 'wrong'
                                : 'inactive'
                          
                        }
                        disabled={disabledState}
                        onClick={() => setShowQuestion({
                          question,
                          category: i,
                          index: j,
                        })}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </main>
  );
}

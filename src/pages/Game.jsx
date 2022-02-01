import {useState, useEffect} from 'react';
import axios from 'axios';

import {useAnswers, useCategories, useQuestions, useShowQuestion} from '../context/gameContext'
import Button from '../components/common/Button';
import Question from '../components/Game/Question';
import Spinner from '../components/common/Spinner';

export default function Game() {
	const [selectedCategories] = useCategories();
  const [questions, setQuestions] = useQuestions();
  const [allAnswers, setAllAnswers] = useAnswers();
  const [showQuestion, setShowQuestion] = useShowQuestion();

  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);


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
          correctCats.push(100 + correctCats.length * 100);
        if(correctCats.length === 6) correctCats[5] += 11;
      });
    });
    calcScore += correctCats.reduce((sum, cat) => sum + cat, 0);
    setScore(calcScore);
  }, [allAnswers]);


  return (
    <>
      <div className={'INFO BOX CLASS NAME HERE'}>
        <p>{score}</p>
      </div>
      <div className={'GAME CONTAINER CLASS NAME HERE'}>
				{isLoading && <Spinner />}
        {!isLoading && !showQuestion &&
          questions.map((category, i) => {

            return (
              <div
                key={i}
                className={'CATEGORY CONTAINER CLASS NAME HERE'}
              >
                <h3>
                  {category[0].category.startsWith('Entertainment:')
                    || category[0].category.startsWith('Science:')
                    ? category[0].category.slice(category[0].category.indexOf(' ') + 1)
                    : category[0].category}
                </h3>
                {questions[i].map((question, j, arr) => {
                  let disabledState = true;
                  if(!allAnswers[i].length
                  || (allAnswers[i].length < 5 && allAnswers[i][j - 1]))
                    disabledState = false;

                    return(
                    <Button
                      className={'BUTTON CLASS NAME HERE'}
                      key={j}
                      title={(j + 1) * 100}
                      maxWidth={'15rem'}
                      disabled={disabledState}
                      onClick={() => setShowQuestion({
                        question,
                        category: i,
                        number: j,
                      })}
                    />
                  );
                })}
              </div>
            );
          })}
        {showQuestion && <Question />}
      </div>
    </>
  );
}

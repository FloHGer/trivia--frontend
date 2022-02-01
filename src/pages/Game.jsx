import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Question from '../components/Game/Question';
import {useAnswers, useCategories, useQuestions, useShowQuestion} from '../context/gameContext'
import Spinner from '../components/common/Spinner';

export default function Game() {
	const [selectedCategories, setSelectedCategories] = useCategories();
  const [questions, setQuestions] = useQuestions();
  const [allAnswers, setAllAnswers] = useAnswers();
  const [showQuestion, setShowQuestion] = useShowQuestion();

  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const allRefs = useRef([[], [], [], [], [], []]);
  
  const setRef = (i, number, ref) => {
    if (ref) allRefs.current[i][number] = ref;
  };

  // fetch questions
  useEffect(() => { 
    let cats = {};
    for (let i = 0; i < selectedCategories.length; i++) {
      (async () => {
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
      })();
    }
    setQuestions(cats);
    setIsLoading(false);
  }, [selectedCategories, setQuestions]);

  // calc score
  useEffect(() => {
    let calcScore = 0;
    let correctCats = [];
    for (let i = 0; i < allAnswers.length; i++) {
      for (let j = 0; j < allAnswers[i].length; j++) {
        if (allAnswers[i][j] === true) {
          calcScore += (j + 1) * 100;
          allRefs.current[i][j].style.color = 'green';
        }
      }
      if (allAnswers[i][4] === true)
        correctCats.push(100 + correctCats.length * 100);
    }
    for (let i in correctCats) calcScore += correctCats[i];
    setScore(calcScore);
  }, [allAnswers]);


  return (
    <>
      <h2 className='score'>Score: {score}</h2>
      <div className='game'>
				{isLoading && <Spinner />}
        {!isLoading && !showQuestion &&
          selectedCategories.map((category, i) => {
            return (
              <div className='category' key={category.id}>
                <h3>
                  {category.name.startsWith('Entertainment:')
                  || category.name.startsWith('Science:')
                    ? category.name.slice(category.name.indexOf(' ') + 1)
                    : category.name}
                </h3>
                <button
                  onClick={() => setShowQuestion({
                      question: questions[i][4],
                      category: i,
                      number: 4,
                    })
                  }
                >500</button>
                <button
                  onClick={() => setShowQuestion({
                      question: questions[i][3],
                      category: i,
                      number: 3,
                    })
                  }
                >400</button>
                <button
                  onClick={() => setShowQuestion({
                      question: questions[i][2],
                      category: i,
                      number: 2,
                    })
                  }
                >300</button>
                <button
                  onClick={() => setShowQuestion({
                      question: questions[i][1],
                      category: i,
                      number: 1,
                    })
                  }
                >200</button>
                <button
                  onClick={() => setShowQuestion({
                      question: questions[i][0],
                      category: i,
                      number: 0,
                    })
                  }
                >100</button>
              </div>
            );
          })}
        {showQuestion && <Question />}
      </div>
    </>
  );
}

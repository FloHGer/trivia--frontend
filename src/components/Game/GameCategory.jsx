import { useEffect, useState } from "react";
import axios from "axios";

import { useShowQuestion, useLoading } from "../../context/gameContext";
import Button from "../common/Button";


export default function GameCategory({data, index}) {
  const [, setShowQuestion] = useShowQuestion();
  const [isLoaded, setIsLoaded] = useLoading();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => {
      const easy = (
        await axios(
          `https://opentdb.com/api.php?amount=2&category=${data.id}&difficulty=easy`
        )
      ).data.results;
      const medium = (
        await axios(
          `https://opentdb.com/api.php?amount=2&category=${data.id}&difficulty=medium`
        )
      ).data.results;
      const hard = (
        await axios(
          `https://opentdb.com/api.php?amount=1&category=${data.id}&difficulty=hard`
        )
      ).data.results;
      setQuestions([...easy, ...medium, ...hard]);
      setIsLoaded(isLoaded => [...isLoaded, isLoaded[index] = true])
    })();
  }, [data]);


  return <div>
    <h3>{data.name}</h3>
    {questions.map((question, i, array) => {
      i = array.length -1 - i;
      return(
        <Button key={i} title={(i + 1) * 100} maxWidth={'15rem'} onClick={() => setShowQuestion(question)} />
      );
    })}
  </div>;
}

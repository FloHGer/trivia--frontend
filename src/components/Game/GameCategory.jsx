import { useEffect, useState } from "react";
import axios from "axios";

export default function GameCategory({data, count}) {
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
    })();
  }, [data]);


  return <div>
    <h3>{data.name}</h3>
    {questions.map((question, i, array) => {
      i = array.length -1 - i;
      return(
        <button key={i}>{(i + 1) * 100}</button>
      );
    })}
  </div>;
}

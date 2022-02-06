import { useState, useEffect } from "react";
import axios from "axios";

import Card from "./common/Card";

export default function Stats() {
  const [data, setData] = useState();

  useEffect(() => {
    (async() => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}/stats`)
      if(res.data.message === 'success') setData(res.data.payload);
      console.log(data)
    })()
  }, []);
  

  return (
    <main>
      <h1>{'Server wide statistics'}</h1>
      {data && <>
      {/* <Card>
      </Card> */}
        <h2>{'Games played'}</h2>
        <p>{data.gamesPlayed}</p>
        <h2>{'Categories completed'}</h2>
        <p>{data.completedCategories}</p>
        <h2>{'Highscore'}</h2>
        <p>{data.score.high}</p>
        <h2>{'Total score'}</h2>
        <p>{data.score.total}</p>
        <h2>{'Correct answers'}</h2>
        <p>{data.answers.correct}</p>
        <h2>{'Total answers'}</h2>
        <p>{data.answers.total}</p>
      </>}
    </main>
  );
}

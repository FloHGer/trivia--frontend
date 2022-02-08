import { useState, useEffect } from "react";
import axios from "axios";

import Card from "./common/Card";

import classes from './Stats.module.scss';


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
    <main className={classes.main}>
      <h1 className={'heading heading__1'}>{'Server wide statistics'}</h1>
      {data &&
      <section>

        <Card className={classes.statCard}>
          <h2 className={'heading heading__2'}>{'Games played'}</h2>
          <Card className={classes.valueCard}>
            <p>{data.gamesPlayed}</p>
          </Card>
        </Card>

        <Card className={classes.statCard}>
          <h2 className={'heading heading__2'}>{'Highscore'}</h2>
          <Card className={classes.valueCard}>
            <p>{data.score.high}</p>
          </Card>
        </Card>

        <Card className={classes.statCard}>
          <h2 className={'heading heading__2'}>{'Total score'}</h2>
          <Card className={classes.valueCard}>
            <p>{data.score.total}</p>
          </Card>
        </Card>

        <Card className={classes.statCard}>
          <h2 className={'heading heading__2'}>{'Total answers'}</h2>
          <Card className={classes.valueCard}>
            <p>{data.answers.total}</p>
          </Card>
        </Card>

        <Card className={classes.statCard}>
          <h2 className={'heading heading__2'}>{'Correct answers'}</h2>
          <Card className={classes.valueCard}>
            <p>{data.answers.correct}</p>
          </Card>
        </Card>

        <Card className={classes.statCard}>
          <h2 className={'heading heading__2'}>{'Categories completed'}</h2>
          <Card className={classes.valueCard}>
            <p>{data.completedCategories}</p>
          </Card>
        </Card>

      </section>}
    </main>
  );
}
